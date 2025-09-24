import express from 'express';
import {getUsers, addUser, getUserByEmail, updateUser, deleteUser} from  '../../database.js';
import debug from 'debug';
const debugUsers = debug('app:users');
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('', async (req, res) => {
  const users = await getUsers();
  if (!users) {
    res.status(500).send('Error retrieving users');
  }else{
    res.status(200).json(users);
  }
});

router.post('', async (req, res) => {
  const newUser = req.body;

  //If user with email already exists, return 400
  if(await getUserByEmail(newUser.email)){
    return res.status(400).json({message: 'Email already in use'});
  }

  const today = new Date();

  newUser.createdAt = today.toLocaleDateString();
  newUser.password = await bcrypt.hash(newUser.password, 10);
  const result = await addUser(newUser);
  if (result.insertedId) {
    res.status(201).json({ ...newUser });
  } else {
    res.status(500).send('Error adding user');
  }
});

router.post('/login',async (req,res) =>{
  const {email, password} = req.body;
  let existingUser = null;
  try{
    existingUser = await getUserByEmail(email);
  }catch(err){
    debugUsers(`Error fetching user by email: ${err}`);
  }
  if(existingUser && await bcrypt.compare(password, existingUser.password)){
    res.status(200).json({message: 'Welcome To LawnConnect', user: existingUser});
  }else{
    res.status(401).json({message: 'Invalid email or password'});
  }

})

router.patch('/:id', async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  const result = await updateUser(userId, updatedData);
  debugUsers(`Update result: ${JSON.stringify(result)}`);
  if (result.modifiedCount === 1) {
    res.status(200).json({message: 'User updated successfully'});
  } else {
    res.status(404).json({message: 'User not found'});
  }
});

router.delete('/:id', async (req,res) => {
 const userId = req.params.id;
 const results = await deleteUser(userId);
 if (results.deletedCount === 1) {
   res.status(200).json({message: 'User deleted successfully'});
 } else {
   res.status(404).json({message: 'User not found'});
 }
});

export {router as usersRouter};