const express = require('express');
const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../Models/user');


usersRouter.post('/', async (req, res) => {
    try{
        const {username, name, password} = req.body;

        // Validate username and password are provided and meet length criteria
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }
  
      if (username.length < 3 || password.length < 3) {
        return res.status(400).json({
          error: 'Username and password must be at least 3 characters long'
        });
      }

        // Check if username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
     }

     // Hash the password
     const saltRounds = 10;
     const passwordHash = await bcrypt.hash(password, saltRounds);
 
     // Create new user
     const user = new User({
         username,
         name,
         passwordHash
     });
 
     // Save user to database
     const savedUser = await user.save();
     res.status(201).json(savedUser);


    } catch (error) {
        res.status(500).json({ error: 'Server error', message: error.message });
      }

   
});

usersRouter.get('/', async (req, res) => {
  try {
    // Fetch all users, but exclude the password hash
    const users = await User.find({}).select('-passwordHash');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

usersRouter.get('/', async (req, res) => {
    try {
      // Find all users and populate the blogs they have created
      const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Server error', message: error.message });
    }
  });

module.exports = usersRouter;