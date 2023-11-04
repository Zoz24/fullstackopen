const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = listHelper.listWithOneBlog
  const blogs = listHelper.blogs

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of many is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})
