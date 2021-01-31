class Firestore {
  constructor(firebaseApp) {
    this.db = firebaseApp.firestore();
  }

  async getCollectionByName(name) {
    return this.db.collection(name);
  }

  async getAllCollections() {
    const snapshots = await this.db.listCollections();
    return snapshots.map((snaps) => {
      return snaps;
    });
  }

  async getAllNameCollections() {
    const snapshots = await this.db.listCollections();
    return snapshots.map((snaps) => {
      return snaps["_queryOptions"].collectionId;
    });
  }

  getNameCollection(collection) {
    return collection["_queryOptions"].collectionId;
  }

  async getAllDocuments(collection) {
    const querySnapshot = await collection.get();
    return querySnapshot._docs().map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
  }

  addDocumentWithId(collectionName, id, data) {
    this.db
      .collection(collectionName)
      .doc(id)
      .set(data)
      .then(() => {
        console.log(`${id} done`);
      });
  }
}

module.exports = Firestore;
