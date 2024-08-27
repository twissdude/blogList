// controllers/blogs.js
const jwt = require('jsonwebtoken');
const express = require('express');
const Blog = require('../Models/blog');
const User = require('../Models/user');
const blogsRouter = require('express').Router();
const {tokenExtractor} = require('../Utils/middleware');

// const middleware = require('../Utils/middleware');




// blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
//   const body = request.body;

//   if (!body.title || !body.url) {
//     return response.status(400).json({
//       error: 'title or url missing',
//     });
//   }

//   const user = await User.findOne();

//   if (!user) {
//     return response.status(401).json({ error: 'token missing or invalid' });
//   }

blogsRouter.use(tokenExtractor);

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

 

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,  // Default likes to 0 if not provided
    user: user._id,
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});


blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = request.user;

  if(!user) {
    return response.status(401).json({error: 'user not found'});
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);

});

// blogsRouter.delete('/:id', async (request, response) => {
//   const id = request.params.id;

//   const deletedBlog = await Blog.findByIdAndRemove(id);
  
//   if (deletedBlog) {
//     response.status(204).end(); // No Content status code
//   } else {
//     response.status(404).json({ error: 'blog not found' });
//   }
// });

// blogsRouter.get('/', async (request, response) => {
//   const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
//   response.json(blogs);
// });


blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' });
  }

  // Check if the user trying to delete the blog is the creator
  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(403).json({ error: 'permission denied' });
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});



blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user;

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' });
  }

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(403).json({ error: 'permission denied' });
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});



blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  const { title, author, url, likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  );

  if (updatedBlog) {
    response.json(updatedBlog.toJSON());
  } else {
    response.status(404).json({ error: 'blog not found' });
  }
});

module.exports = blogsRouter;
