const { Schema, model } = require('mongoose')
const commentSchema = require('./Comment')

const postSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    postText: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: [commentSchema],
  },
  { timestamps: true },
)

postSchema.virtual('reactionCount').get(function () {
  return this.reactions.length
})

const Post = model('Post', postSchema)
module.exports = Post
