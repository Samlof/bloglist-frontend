const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    author: 'Pekka Saari',
    title: 'Story of Javascript',
    likes: 5,
    url: 'www.storyof.com',
    user: {
      name: 'Matti'
    }
  }, {
    id: '5a451df7571c224a31b5c8ke',
    author: 'Matti Saari',
    title: 'Way Thru Web',
    likes: 0,
    url: 'www.way.com',
    user: {
      name: 'Jaakko'
    }
  }, {
    id: '5a451df7571h224a31b5c8ke',
    author: 'Maarit Aalto',
    title: 'Journey of REST',
    likes: 2,
    url: 'www.journey.com',
    user: {
      name: 'Jaakko'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => { }

export default { getAll, setToken }