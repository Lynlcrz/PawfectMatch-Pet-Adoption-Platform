const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase
const serviceAccount = require('./serviceAccountKey.json');



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Sample Route: Add user
app.post('/api/users', async (req, res) => {
  try {
    const user = req.body;
    const docRef = await db.collection('users').add(user);
    res.status(201).send({ id: docRef.id, ...user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Sample Route: Get all users
app.get('/api/users', async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.post('/api/signup', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      if (!username || !email || !password)
        return res.status(400).json({ message: 'All fields are required' });
  
      // Check if username or email already exists
      const existingUsers = await db.collection('users')
        .where('email', '==', email)
        .get();
  
      if (!existingUsers.empty) {
        return res.status(409).json({ message: 'Email already exists' });
      }
  
      const existingUsername = await db.collection('users')
        .where('username', '==', username)
        .get();
  
      if (!existingUsername.empty) {
        return res.status(409).json({ message: 'Username already exists' });
      }
  
      // Save user
      const newUser = { username, email, password };
      const docRef = await db.collection('users').add(newUser);
  
      res.status(201).json({ id: docRef.id, username, email });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  