const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../Models/user');
const api = supertest(app);
const bcrypt = require('bcryptjs');

beforeEach(async () => {
  await User.deleteMany({});
  const user = new User({ username: 'root', name: 'Root User', passwordHash: await bcrypt.hash('sekret', 10) });
  await user.save();
});

describe('creating a new user', () => {
  test('fails with status code 400 if username is too short', async () => {
    const newUser = {
      username: 'ro',
      name: 'Short Username',
      password: 'secret123',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('Username and password must be at least 3 characters long');
  });

  test('fails with status code 400 if password is too short', async () => {
    const newUser = {
      username: 'root2',
      name: 'Root 2',
      password: 'se',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('Username and password must be at least 3 characters long');
  });

  test('fails with status code 400 if Username already taken', async () => {
    const newUser = {
      username: 'root',
      name: 'Another Root',
      password: 'secret123',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('Username already taken');
  });

  test('succeeds with a valid user', async () => {
    const newUser = {
      username: 'newuser',
      name: 'New User',
      password: 'secret123',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(2);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

afterAll(() => {
  mongoose.connection.close();
});


