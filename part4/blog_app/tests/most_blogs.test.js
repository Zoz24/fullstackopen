const list_helper = require('../utils/list_helper')

describe('most blogs', () => {
  const listWithOneBlog = list_helper.listWithOneBlog
  const blogs = list_helper.blogs

  test('when list has one blog, equals one ', () => {
    const result = list_helper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('of many is calculated right', () => {
    const result = list_helper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})
