const fs = require("fs");
const admin = require("firebase-admin");
const Firestore = require("./firestore");
const path = "./serviceAccountKey.json";
const { importDb, exportDb } = require("./firesync");

try {
  if (fs.existsSync(path)) {
    const serviceAccount = require(path);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    const fireStore = new Firestore(admin);
    if (process.argv[2] === "export") {
      //  Export
      (async () => {
        const collections = await fireStore.getAllCollections();
        const data = await Promise.all(
          collections.map(async (collection) => {
            const dataCollection = await fireStore.getAllDocuments(collection);
            return {
              collectionName: fireStore.getNameCollection(collection),
              collectionData: dataCollection,
            };
          })
        );
        exportDb(data);
      })();
    }
  else if(process.argv[2]==="import"){
      // Import
      const data = importDb();
      (async () => {
        data.forEach((d) => {
          const cltData = JSON.parse(d.collectionData);
          cltData.map((docData) => {
            fireStore.addDocumentWithId(
              d.collectionName,
              docData.id,
              docData.data
            );
          });
        });
      })();
    } else{
    console.log("error")
    }
  
  } else {
    console.log(
      "Cannot found serviceAccountKey file. Please change *.json file to serviceAccountKey.json"
    );
  }
} catch (err) {
  console.error(err);
}
