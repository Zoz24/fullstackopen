const list_helper = require('../utils/list_helper')

describe('most likes', () => {
  const listWithOneBlog = list_helper.listWithOneBlog
  const blogs = list_helper.blogs

  test('when list has only one blog, equals the likes of that', () => {
    const result = list_helper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of list of many is calculated right', () => {
    const result = list_helper.favoriteBlog(blogs)
    const expected = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    }
    expect(result).toEqual(expected)
  })

  test('of the author with most likes is calculated right', () => {
    const result = list_helper.mostLikes(blogs)
    const expected = { author: 'Edsger W. Dijkstra', likes: 17 }
    expect(result).toEqual(expected)
  })
})
