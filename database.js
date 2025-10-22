import {MongoClient, ObjectId} from 'mongodb';
import debug from "debug";
const debugDb = debug("app:Database");


let _db = null;
let _client = null; 

async function connectToDatabase(){
  if(!_db){
    const connectionString = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME;

    const client = await MongoClient.connect(connectionString);
    _db = client.db(dbName);
  }
  return _db;
}


async function ping(){
  const db = await connectToDatabase();
  const pong = await db.command({ping:1});
  debugDb(`Ping:, ${JSON.stringify(pong)}`);
}

async function getUsers(filter, sort, limit=0, skip = 0){
  const db = await connectToDatabase();
  debugDb(`Filter: ${JSON.stringify(filter)}`);
  let query =  db.collection('Users').find(filter).sort(sort);
  
  if (skip > 0) {
    query = query.skip(skip);
  }
  
  if (limit > 0) {
    query = query.limit(limit);
  }
  return query.toArray();
}

async function addUser(user){
  const db = await connectToDatabase();
  user._id = new ObjectId();
  return db.collection('Users').insertOne(user);
}

async function getUserByEmail(email){
  const db = await connectToDatabase();
  const user = await db.collection('Users').findOne({email: email});
  return user;
}

async function updateUser(userId, updatedUser){
  const db = await connectToDatabase();
  const result = await db.collection('Users').updateOne({_id: userId}, {$set: updatedUser});
  return result;
}

async function deleteUser(userId){
  const db = await connectToDatabase();
  const result = await db.collection('Users').deleteOne({_id: new ObjectId(userId)});
  return result;
}

async function getClient(){
  if(!_client){
    await connectToDatabase(); // This will create the client if it doesn't exist
  }
  return _client;
}

// Add this function to get the database object
async function getDatabase(){
  return await connectToDatabase();
}

export {ping, getUsers, addUser, getUserByEmail, updateUser, deleteUser, getClient, getDatabase};