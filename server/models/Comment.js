const { Schema } = require('mongoose')

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = commentSchema
