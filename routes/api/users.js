import express from 'express';
import {getUsers, addUser, getUserByEmail, updateUser, deleteUser} from  '../../database.js';
import debug from 'debug';
const debugUsers = debug('app:users');
import bcrypt from 'bcrypt';
import { registerSchema, updateUserSchema } from '../../validation/userSchema.js';
import { validate } from '../../middleware/joiValidator.js';
import {validId} from '../../middleware/validId.js';

const router = express.Router();

router.get('', async (req, res) => {
  const {keywords, role, minAge, maxAge, page, limit, sortBy} = req.query;


  debugUsers(`Sort By is ${sortBy}`);

  // Handle pagination parameters
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 0; // 0 means no limit
  const skip = limitNum > 0 ? (pageNum - 1) * limitNum : 0;

  //debugUsers(`Query Params - keywords: ${keywords}, role: ${role}, minAge: ${minAge}, maxAge: ${maxAge}`);
  //Build a query filter
  const filter = {};

  if(keywords) filter.$text = {$search: keywords};  
  if(role) filter.role = role;

  
  // Handle date filtering with simpler approach
  if(minAge || maxAge) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateFilter = {};

    if(maxAge) dateFilter.$gte = new Date(today.getTime() - maxAge * 24 * 60 * 60 * 1000); //Records must be newer than maxAge days
    if(minAge) dateFilter.$lte = new Date(today.getTime() - minAge * 24 * 60 * 60 * 1000); //Records must be older than minAge days

    filter.createdAt = dateFilter;
  }

  const sortOptions = {
     email: { email: 1 },
     createdAt: { createdAt: 1 },
     role: { role: 1 }
  };
  const sort = sortOptions[sortBy] || {role:-1}; // Default to no sorting if sortBy is not provided or invalid
 
  

  debugUsers(`Sort is ${JSON.stringify(sort)}`);

  const users = await getUsers(filter, sort, limitNum, skip); 
  if (!users) {
    res.status(500).send('Error retrieving users');
  }else{
    res.status(200).json(users);
  }
});

router.post('', validate(registerSchema), async (req, res) => {
  const newUser = req.body;

  //If user with email already exists, return 400
  if(await getUserByEmail(newUser.email)){
    return res.status(400).json({message: 'Email already in use'});
  }

  const today = new Date();

  newUser.createdAt = today;
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

router.patch('/:id', validate(updateUserSchema), validId('id'), async (req, res) => {
  const userId = req.id //Object Id
  const updatedData = req.body;
  debugUsers(`Updating user with ID: ${userId} with data: ${JSON.stringify(updatedData)}`);
  const result = await updateUser(userId, updatedData);
  debugUsers(`Update result: ${JSON.stringify(result)}`);
  if (result.modifiedCount === 1) {
    res.status(200).json({message: 'User updated successfully'});
  } else {
    res.status(404).json({message: 'User not updated'});
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