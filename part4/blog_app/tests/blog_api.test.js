const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(listHelper.blogs)
  })

  test('return correct amount of blogs in json format', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(listHelper.blogs.length)
  })

  test('return correct id property', async () => {
    const response = await api.get('/api/blogs')
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
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(listHelper.blogs.length + 1)
  })

  test('if likes property is missing, default to 0', async () => {
    const newBlog = {
      title: 'test blog',
      author: 'test author',
      url: 'test url',
    }
    await api.post('/api/blogs').send(newBlog)
    const response = await api.get('/api/blogs')
    expect(response.body[listHelper.blogs.length].likes).toBe(0)
  })

  test('if title and url properties are missing, return 400', async () => {
    const newBlog = {
      author: 'test author',
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
