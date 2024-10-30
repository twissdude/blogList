// controllers/blogs.js
const jwt = require('jsonwebtoken');
// const express = require('express');
const Blog = require('../Models/blog');
const User = require('../Models/user');
const blogsRouter = require('express').Router();
const { tokenExtractor, userExtractor } = require('../Utils/middleware');


blogsRouter.put('/:id', async (request, response) => {
  const {body} = request;

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  };


  const blog = await Blog.findOneAndUpdate(request.params.id, updatedBlog, {new: true} );
  response.json(blog);
});

blogsRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
  const body = request.body;
  
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(request.user.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id // Assign blog to user based on the token's user ID
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

// blogsRouter.get('/blogs', async (req, res) => {
//   try {
//     // Find all blogs and populate the user (creator) field
//     const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
//     res.status(200).json(blogs);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error', message: error.message });
//   }
// });

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});



// Delete a blog only if the user who created it makes the request
blogsRouter.delete('/:id', async (request, response) => {
  // Verify the token
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  // If token is missing or invalid
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  // If the blog does not exist
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  // Check if the user making the request is the creator of the blog
  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(403).json({ error: 'permission denied: not the creator' })
  }

  // If the user is the creator, delete the blog
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


blogsRouter.post('/', async (request, response) => {
  const user = request.user  // Extracted by the middleware

  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id  // Attach the user's ID to the blog
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user  // Extracted by the middleware
  const blog = await Blog.findById(request.params.id)

  // Check if the blog exists
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  // Check if the user is the creator of the blog
  if (blog.user.toString() !== user._id.toString()) {
    return response.status(403).json({ error: 'permission denied: not the creator' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})





module.exports = blogsRouter;
