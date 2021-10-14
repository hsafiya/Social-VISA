const faker = require('faker')

const db = require('../config/connection')
const { Post, User } = require('../models')

db.once('open', async () => {
  await Post.deleteMany({})
  await User.deleteMany({})

  // create user data
  const userData = []

  for (let i = 0; i < 19; i += 1) {
    const username = faker.internet.userName()
    const email = faker.internet.email(username)
    const password = faker.internet.password()
    const profilePicture = faker.image.avatar()
    const coverPicture = faker.image.image()
    const desc = faker.lorem.words(Math.round(Math.random() * 5) + 1)
    const city = faker.address.cityName()
    const from = faker.address.cityName()

    userData.push({
      username,
      email,
      password,
      desc,
      city,
      from,
      profilePicture,
      coverPicture,
    })
  }

  const createdUsers = await User.collection.insertMany(userData)

  // create friends
  for (let i = 0; i < 19; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length)
    const { username: username } = createdUsers.ops[randomUserIndex]

    let friendUsername = username

    while (friendUsername === username) {
      const randomUserIndex = Math.floor(
        Math.random() * createdUsers.ops.length,
      )
      friendUsername = createdUsers.ops[randomUserIndex].username
    }

    const friend = await User.findOne({ username: friendUsername })

    await User.findOneAndUpdate(
      { username: username },
      { $addToSet: { friends: friend } },
    )
  }

  // create thoughts
  let createdPosts = []
  for (let i = 0; i < 30; i += 1) {
    const postText = faker.lorem.words(Math.round(Math.random() * 20) + 1)

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length)
    const { username, _id: userId } = createdUsers.ops[randomUserIndex]

    const createdPost = await Post.create({ postText, username })

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { posts: createdPost._id } },
    )

    createdPosts.push(createdPost)
  }

  console.log('all done!')
  process.exit(0)
})
