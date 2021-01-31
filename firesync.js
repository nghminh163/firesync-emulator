const fs = require("fs");

const path = "./firesync";

function exportDb(data) {
  // if (fs.existsSync(path)) {
  //   fs.rmdirSync(path, { recursive: true });
  // }
  // fs.mkdirSync(path);
  data.forEach((collection) => {
    fs.writeFile(
      `${path}/${collection.collectionName}.json`,
      JSON.stringify(collection.collectionData),
      "utf8",
      (err) => {
        if (err) {
          return console.error(`Error write ${collection.collectionName}.json`);
        }
        console.log(`Success write ${collection.collectionName}.json`);
      }
    );
  });
}

function importDb() {
  const listFiles = fs.readdirSync(path).map((name) => name.split(".json")[0]);
  return listFiles.map((name) => {
    const data = fs.readFileSync(`${path}/${name}.json`, "utf8");
    return {
      collectionName: name,
      collectionData: data,
    };
  });
}

module.exports = {
  importDb,
  exportDb,
};
