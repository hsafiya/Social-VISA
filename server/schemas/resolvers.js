const { AuthenticationError } = require('apollo-server-express')
const { User, Post } = require('../models')
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('posts')

        return userData
      }

      throw new AuthenticationError('Not logged in')
    },
    users: async () => {
      return User.find().select('-__v -password').populate('posts')
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('posts')
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {}
      return Post.find(params).sort({ createdAt: -1 })
    },
    post: async (parent, { _id }) => {
      return Post.findOne({ _id })
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args)
      const token = signToken(user)

      return { token, user }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email })

      if (!user) {
        throw new AuthenticationError('Incorrect credentials')
      }

      const correctPw = await user.isCorrectPassword(password)

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials')
      }

      const token = signToken(user)
      return { token, user }
    },
    editUser: async (parent, args, context) => {
      if (context.user) {
        const {
          profilePicture,
          coverPicture,
          desc,
          city,
          from,
          relationship,
        } = args
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $set: {
              profilePicture: profilePicture,
              coverPicture: coverPicture,
              desc: desc,
              city: city,
              from: from,
              relationship: relationship,
            },
          },
          { new: true },
        )

        return updatedUser
      }

      throw new AuthenticationError('You need to be logged in!')
    },
    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({
          ...args,
          username: context.user.username,
        })

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true },
        )

        return post
      }

      throw new AuthenticationError('You need to be logged in!')
    },
    deletePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findById(postId)
        if (context.user.username === post.username) {
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $pull: { posts: postId } },
            { new: true },
          )
          return User
        } else {
          console.error('You can delete only your own posts!')
        }
      }
      throw new AuthenticationError('You need to be logged in!')
    },
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          {
            $push: {
              comments: { commentText, username: context.user.username },
            },
          },
          { new: true, runValidators: true },
        )

        return updatedPost
      }

      throw new AuthenticationError('You need to be logged in!')
    },
    follow: async (parent, { username }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { username: context.user.username },
          { $addToSet: { followings: { username: username } } },
          { new: true },
        ).populate('followings')
        const friend = await User.findOneAndUpdate(
          { username: username },
          { $addToSet: { followers: { username: context.user.username } } },
          { new: true },
        ).populate('followers')

        return updatedUser
      }

      throw new AuthenticationError('You need to be logged in!')
    },
    unfollow: async (parent, { username }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { username: context.user.username },
          { $pull: { followings: { username: username } } },
          { new: true },
        ).populate('followings')
        const friend = await User.findOneAndUpdate(
          { username: username },
          { $pull: { followers: { username: context.user.username } } },
          { new: true },
        ).populate('followers')

        return updatedUser
      }

      throw new AuthenticationError('You need to be logged in!')
    },
  },
}

module.exports = resolvers
