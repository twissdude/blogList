
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const mongoose = require('mongoose');

// // const usersRouter = require('./Controllers/users');

// // const bodyParser = require('body-parser');

// // const blogsController = require('./Controllers/blogs');
// // const router = express.Router();


// // router.get('/api/blogs', blogsController.getAllBlogs);
// // router.post('/api/blogs', blogsController.createBlog);
// // router.delete('/api/blogs/:id', blogsController.getAllBlogs);


// // const Blog = require('./Models/blog');
// // const blogsRouter = require('./Controllers/blogs');

// // const mongoUrl = process.env.MONGO_URI;
// // mongoose.connect(mongoUrl);





// // const blogSchema = new mongoose.Schema({
// //     title: String,
// //     author: String,
// //     url: String,
// //     likes: Number
// // });

// // const Blog = mongoose.model('Blog', blogSchema);

// const mongoUrl = 'mongodb+srv://woyetajudeen:bsPOThInC0J7Dm3o@phone-cluster.fc9rltf.mongodb.net/?retryWrites=true&w=majority&appName=Phone-Cluster';
// mongoose.connect(mongoUrl)
// .then(result => {
//     console.log('Connected to MongoDB')
// })
// .catch(error => {
//     console.log('error connecting to MongoDB:', error.message)
// });
   

// app.use(cors());
// app.use(express.json());
// // app.use(bodyParser.json());
// // app.use('/api/users', usersRouter);


// // app.get('/api/blogs', (request, response) => {
// //     Blog.find({})
// //     .then(blogs => {
// //         response.json(blogs);
// //     });
// // });


// // app.get('/api/blogs', async (req, res) => {
// //     try {
// //       const blogs = await Blog.find({});
// //       res.json(blogs);
// //     } catch (error) {
// //       res.status(500).json({ error: 'Something went wrong' });
// //     }
// //   });
  
// //   app.post('/api/blogs', async (req, res) => {
// //     try {
// //       const blog = new Blog(req.body);
// //       const savedBlog = await blog.save();
// //       res.status(201).json(savedBlog);
// //     } catch (error) {
// //       res.status(400).json({ error: 'Invalid data' });
// //     }
// //   });


// // app.delete('/blogs/:id', async (req, res) => {
// //   try {
// //     const blog = await Blog.findByIdAndDelete(req.params.id);
// //     if (!blog) {
// //       return res.status(404).send({ message: 'Blog post not found' });
// //     }
// //     res.status(200).send({ message: 'Blog post deleted' });
// //   } catch (error) {
// //     res.status(500).send({ message: 'Error deleting blog post' });
// //   }
// // });



// // app.post('/api/blogs', (request, response) => {
// //     const blog = new Blog(request.body);

// //     blog.save()
// //     .then(result => {
// //         response.status(201).json(result);
// //     });
// // });

// // app.use('/api/users', usersRouter);

// const PORT = 3001;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// // module.exports = server;