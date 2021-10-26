import { db } from './db'

export function removeDocument(collectionName, documentId){
  db.collection(collectionName)
  .doc(documentId)
  .delete().then(() => {
    console.log('user deleted!');
  });
}

export function addDocument(collectionName, documentObject){
  db.collection(collectionName)
  .add(documentObject)
  .then(() => {
    console.log('user added!');
  });
}

export function updateDocument(collectionName, newDocumentObject){
  db.collection(collectionName)
    .doc(newDocumentObject.id)
    .set(newDocumentObject)
    .then(() => {
      console.log('user updated!');
    })
}
