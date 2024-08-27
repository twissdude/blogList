// tests/blog_api.test.js
// const { beforeEach } = require('node:test')
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../Models/blog');
const User = require('../Models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


let token;


beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});


  const user = new User({
    username: 'testuser',
    passwordHash: await bcrypt.hash('password', 10),
  });

  await user.save();

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  token = jwt.sign(userForToken, process.env.SECRET);

  const initialBlogs = [
    { title: 'Blog 1', author: 'Author 1', url: 'http://blog1.com', likes: 1 },
    { title: 'Blog 2', author: 'Author 2', url: 'http://blog2.com', likes: 2 },
  ];

  await Blog.insertMany(initialBlogs);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await Blog.find({});
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

  const titles = blogsAtEnd.map(b => b.title);
  expect(titles).toContain('Test Blog');
});


test('adding a blog fails with status code 401 if token is not provided', async () => {
  const newBlog = {
    title: 'Unauthorized Blog',
    author: 'No Token',
    url: 'http://unauthorizedurl.com',
    likes: 0,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401);

  const blogsAtEnd = await Blog.find({});
  expect(blogsAtEnd).toHaveLength(initialBlogs.length);
});


afterAll(async () => {
  await mongoose.connection.close();
});
