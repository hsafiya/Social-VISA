const { Schema } = require('mongoose')

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = commentSchema
