const { connect } = require('./dbConnection.js'); // import connect function 
const { MongoClient, ObjectId } = require('mongodb'); 
// Define your MongoDB Atlas credentials and DB name once 
const connectionParams = { 
  host: 'cluster0.3isme4y.mongodb.net', 
  dbName: 'DataTest1', 
  USER: 'glilamouna', 
  PASS: 'rC0mE7' 
}; 
async function fetchData() {
  const db = await connect(connectionParams); 
  const data = {};
  for (const { name } of await db.listCollections().toArray())
    data[name] = await db.collection(name).find().toArray();
  return data;
}
//function to get only the table names
async function getTableNames() {
  return (await (await connect(connectionParams))
    .listCollections().toArray()).map(c => c.name);
} 
//function to get  an item with its id
async function getItemById(collection, id) {
  const db = await connect((connectionParams));
  return db.collection(collection).findOne({ _id: new ObjectId(id) }); // Find one document by ID
}
async function updateItemById(collection, id, updateFields) { 
  const db = await connect(connectionParams); 
  // Log pour debug 
  console.log('Converting id to ObjectId, fields to update:', updateFields); 
  // Supprimer le champ _id pour éviter l'erreur Mongo
  delete updateFields._id;
  // Faire l'update
  return db
    .collection(collection)
    .updateOne(
      { _id: new ObjectId(id) }, 
      { $set: updateFields }        
    );
}
//function to delete an item
async function deleteItemById(collection, id) {
  const db = await connect(connectionParams);
  return db.collection(collection).deleteOne({ _id: new ObjectId(id) });
}
//function to delete a TABLE
async function deleteCollectionByName(collectionName) {
  const db = await connect(connectionParams);
  return db.collection(collectionName).drop();  // Drops the entire collection
}
module.exports = { fetchData, getTableNames, updateItemById, deleteItemById, deleteCollectionByName, getItemById};
