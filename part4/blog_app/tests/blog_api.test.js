const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

let token = null
describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(listHelper.blogs)
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('skurrr', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()

    const loginResponse = await api
      .post('/api/login')
      .send({
        username: 'root',
        password: 'skurrr',
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // Set token only if loginResponse.body contains a token
    if (loginResponse.body.token) {
      token = loginResponse.body.token
    } else {
      console.error('Token not found in login response', loginResponse.body)
    }
  })

  test('return correct amount of blogs in json format', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(listHelper.blogs.length)
  })

  test('return correct id property', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].id).toBeDefined()
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'test blog',
      author: 'test author',
      url: 'test url',
      likes: 10,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(listHelper.blogs.length + 1)
  })

  test('if likes property is missing, default to 0', async () => {
    const newBlog = {
      title: 'test blog',
      author: 'test author',
      url: 'test url',
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body[listHelper.blogs.length].likes).toBe(0)
  })

  test('if title and url properties are missing, return 400', async () => {
    const newBlog = {
      author: 'test author',
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('a blog can be deleted', async () => {
    // First, create a new blog to ensure the user has ownership of it
    const newBlog = {
      title: 'Blog to delete',
      author: 'Author',
      url: 'http://url.to.delete',
      likes: 0,
    }

    // Create a new blog entry
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // Get the blogs after creating a new one
    let response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogToDelete = response.body.find((b) => b.title === newBlog.title)

    // Delete the blog we just created
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    // Get the list of blogs after deletion to confirm it's gone
    const blogsAtEnd = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // Check that the blog list is reduced by one
    expect(blogsAtEnd.body).toHaveLength(response.body.length - 1)

    // Ensure that the deleted blog is not in the list anymore
    const deletedBlog = blogsAtEnd.body.find((b) => b.id === blogToDelete.id)
    expect(deletedBlog).toBeUndefined()
  })

  test('likes of a blog can be updated', async () => {
    // Create a new blog to ensure the user has ownership of it
    const newBlog = {
      title: 'Blog to be updated',
      author: 'Author',
      url: 'http://url.to.update',
      likes: 0,
    }

    // Create a new blog entry
    const createdBlogResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogToUpdate = createdBlogResponse.body

    const updatedBlog = {
      likes: 100,
    }

    // Update the likes for the blog we just created
    await api
      .put(`/api/blogs/${blogToUpdate.id}/likes`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedBlog)
      .expect(200)

    // Fetch that specific blog to verify the likes have been updated
    const updatedBlogResponse = await api.get(`/api/blogs`)
    const updatedBlogInDb = updatedBlogResponse.body.find(
      (b) => b.id === blogToUpdate.id
    )

    expect(updatedBlogInDb.likes).toBe(updatedBlog.likes)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
