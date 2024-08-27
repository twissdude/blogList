require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const loginRouter = require('./Controllers/login');
const blogsRouter = require('./Controllers/blogs');
const usersRouter = require('./Controllers/users');
const middleware = require('./Utils/middleware')
const cors = require('cors');
// // const mongoose = require('mongoose');

app.use(cors());
// app.use(express.json());

// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
//   }

  
const mongoUrl = 'mongodb+srv://woyetajudeen:bsPOThInC0J7Dm3o@phone-cluster.fc9rltf.mongodb.net/?retryWrites=true&w=majority&appName=Phone-Cluster';
mongoose.connect(mongoUrl)
.then(result => {
    console.log('Connected to MongoDB')
})
.catch(error => {
    console.log('error connecting to MongoDB:', error.message)
});

app.use(express.json());
// app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

const PORT = 3009;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;