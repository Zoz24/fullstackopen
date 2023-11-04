const _ = require('lodash')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => {
    return favorite.likes > blog.likes ? favorite : blog
  }, {})
}

const mostBlogs = (blogs) => {
  // Count the blogs per author
  const authorCounts = _.countBy(blogs, 'author')

  // Find the author with the most blogs
  const authorWithMostBlogs = _.maxBy(
    Object.keys(authorCounts),
    (author) => authorCounts[author]
  )

  // Return the author and the blog count
  return {
    author: authorWithMostBlogs,
    blogs: authorCounts[authorWithMostBlogs],
  }
}

const mostLikes = (blogs) => {
  // Group the blogs by author
  const blogsByAuthor = _.groupBy(blogs, 'author')

  // Calculate the total likes per author
  const likesByAuthor = _.mapValues(blogsByAuthor, (blogs) =>
    blogs.reduce((sum, blog) => sum + blog.likes, 0)
  )

  // Find the author with the most likes
  const authorWithMostLikes = _.maxBy(
    Object.keys(likesByAuthor),
    (author) => likesByAuthor[author]
  )

  // Return the author and the like count
  return {
    author: authorWithMostLikes,
    likes: likesByAuthor[authorWithMostLikes],
  }
}

module.exports = {
  blogs,
  listWithOneBlog,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
