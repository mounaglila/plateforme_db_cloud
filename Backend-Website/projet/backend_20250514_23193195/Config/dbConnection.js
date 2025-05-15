const { MongoClient } = require('mongodb');
let client;
async function connect({  
host='cluster0.3isme4y.mongodb.net',  
dbName='DataTest1',  
 USER = 'glilamouna',  
 PASS = 'rC0mE7'  
}) {  
// Build auth string if both USER and PASS are provided  
const auth = USER && PASS ? `${encodeURIComponent(USER)}:${encodeURIComponent(PASS)}@` : ''; 
// Construct URI for MongoDB Atlas  
const uri = `mongodb+srv://${auth}${host}/${dbName}?retryWrites=true&w=majority`; 
console.log(`Connecting to MongoDB Atlas at ${uri}`); 
  try {
    if (client) {
      console.log('Closing previous connection');
      await client.close();
    }
    client = await MongoClient.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
    }); 
    console.log('Connection established to MongoDB');
    return client.db(dbName);
  } catch (err) {
    console.error('Connection failed:', err.message);
    throw err;
  }
}
module.exports = { connect };
