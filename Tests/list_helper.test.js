// const { test, describe } = require('node:test');
// const { test, describe, beforeEach, afterAll } = require('node:test');
const assert = require('node:assert');
// const supertest = require('supertest');
// const mongoose = require('mongoose');
// const app = require('../server'); 
// const Blog = mongoose.model('Blog');
const listHelper = require('../Utils/list_helper');


test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
//   assert.strictEqual(result, 1);
});


describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ];

    const listWithMultipleBlogs = [
        {
          _id: '5a422aa71b54a676234d17f7',
          title: 'First class tests',
          author: 'Robert C. Martin',
          url: 'https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
          likes: 10,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f9',
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 12,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f0',
          title: 'TDD harms architecture',
          author: 'David Heinemeier Hansson',
          url: 'https://dhh.dk/2014/tdd-is-dead-long-live-testing.html',
          likes: 0,
          __v: 0
        }
      ];
    
      const listWithNoBlogs = [];

      test('when list has only one blog, equals the like of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
      });

      test('when list has multiple blogs, equals the sum of likes', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs);
        expect(result).toBe(22);
      });

      test('when list has no blogs, equals zero', () => {
        const result = listHelper.totalLikes(listWithNoBlogs);
        expect(result).toBe(0);
      });
});

describe('favorite blog', () => {

    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ];

    const listWithMultipleBlogs = [
        {
          _id: '5a422aa71b54a676234d17f7',
          title: 'First class tests',
          author: 'Robert C. Martin',
          url: 'https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
          likes: 10,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f9',
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 12,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f0',
          title: 'TDD harms architecture',
          author: 'David Heinemeier Hansson',
          url: 'https://dhh.dk/2014/tdd-is-dead-long-live-testing.html',
          likes: 0,
          __v: 0
        }
      ];
    
      const listWithNoBlogs = [];

      test('when list has multiple blogs, return the blog with most likes', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog);
        assert.deepStrictEqual(result, {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
          });
      });

      test('when list has multiple blogs, equals the sum of likes', () => {
        const result = listHelper.favoriteBlog(listWithMultipleBlogs);
        assert.deepStrictEqual(result, {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
          });
      });

      test('when list has no blogs, equals zero', () => {
        const result = listHelper.favoriteBlog(listWithNoBlogs);
        assert.strictEqual(result, null);
      }); 
});

describe('most blog', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ];

    const listWithMultipleBlogs = [
        {
          _id: '5a422aa71b54a676234d17f7',
          title: 'First class tests',
          author: 'Robert C. Martin',
          url: 'https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
          likes: 10,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f9',
          title: 'Canonical string reduction',
          author: 'Robert C. Martin',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 12,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f0',
          title: 'TDD harms architecture',
          author: 'David Heinemeier Hansson',
          url: 'https://dhh.dk/2014/tdd-is-dead-long-live-testing.html',
          likes: 0,
          __v: 0
        }
      ];
    
      const listWithNoBlogs = [];

      test('when list has only one blog, return that author with one blog', () => {
        const result = listHelper.mostBlogs(listWithOneBlog);
        assert.deepStrictEqual(result, {
            author: 'Edsger W. Dijkstra',
            blogs: 1
          });
      });

      test('when list has multiple blogs, return the author with most blogs', () => {
        const result = listHelper.mostBlogs(listWithMultipleBlogs);
        assert.deepStrictEqual(result, {
            author: 'Robert C. Martin',
            blogs: 2
          });
      });

      test('when list has no blogs, return null', () => {
        const result = listHelper.mostBlogs(listWithNoBlogs);
        assert.strictEqual(result, null);
      }); 
});

describe('most likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ];

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f7',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f0',
      title: 'TDD harms architecture',
      author: 'David Heinemeier Hansson',
      url: 'https://dhh.dk/2014/tdd-is-dead-long-live-testing.html',
      likes: 0,
      __v: 0
    }
  ];

  const listWithNoBlogs = [];

  test('when list has only one blog, return that author with likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 5
    });
  });

  test('when list has multiple blogs, return the author with most likes', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs);
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 12
    });
  });

  test('when list has no blogs, return null', () => {
    const result = listHelper.mostLikes(listWithNoBlogs);
    assert.strictEqual(result, null);
  });
});




// const api = supertest(app);

// const initialBlogs = [
//   {
//     title: 'Go To Statement Considered Harmful',
//     author: 'Edsger W. Dijkstra',
//     url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//     likes: 5,
//   },
//   {
//     title: 'Canonical string reduction',
//     author: 'Edsger W. Dijkstra',
//     url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
//     likes: 12,
//   },
// ];

// beforeEach(async () => {
//   await Blog.deleteMany({});
//   await Blog.insertMany(initialBlogs);
// });

// afterAll(() => {
//   mongoose.connection.close();
// });

// beforeEach(async () => {
//   await Blog.deleteMany({});
//   let blogObject = new Blog(initialBlogs[0]);
//   await blogObject.save();
//   blogObject = new Blog(initialBlogs[1]);
//   await blogObject.save();
// });

// test('blogs are returned as json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/);
// });

// test('there are two blogs', async () => {
//   const response = await api.get('/api/blogs');

//   expect(response.body).toHaveLength(initialBlogs.length);
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });





// beforeAll(async () => {
//   const url = 'mongodb+srv://woyetajudeen:5ugpEw7uVqgRL7DZ@phone-cluster.fc9rltf.mongodb.net/?retryWrites=true&w=majority&appName=Phone-Cluster';
//   await mongoose.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });

// afterEach(async () => {
//   await Blog.deleteMany({});
// });

// describe('DELETE /blogs/:id', () => {
//   it('should delete a blog post by ID', async () => {
//     const blog = new Blog({ title: 'Test Blog', content: 'Test Content' });
//     await blog.save();

//     const res = await request(app).delete(`/blogs/${blog._id}`);
//     expect(res.status).toBe(200);
//     expect(res.body.message).toBe('Blog post deleted');

//     const deletedBlog = await Blog.findById(blog._id);
//     expect(deletedBlog).toBeNull();
//   });

//   it('should return 404 if the blog post is not found', async () => {
//     const res = await request(app).delete('/blogs/610c4a5e8e620f2568eac5b3');
//     expect(res.status).toBe(404);
//     expect(res.body.message).toBe('Blog post not found');
//   });

//   it('should return 500 if there is an error deleting the blog post', async () => {
//     jest.spyOn(Blog, 'findByIdAndDelete').mockImplementation(() => {
//       throw new Error('Error deleting blog post');
//     });

//     const blog = new Blog({ title: 'Test Blog', content: 'Test Content' });
//     await blog.save();

//     const res = await request(app).delete(`/blogs/${blog._id}`);
//     expect(res.status).toBe(500);
//     expect(res.body.message).toBe('Error deleting blog post');
//   });
// });