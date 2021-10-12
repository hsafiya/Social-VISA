import { gql } from '@apollo/client'

export const QUERY_POSTS = gql`
  query posts($username: String) {
    posts(username: $username) {
      _id
      postText
      createdAt
      username
      comments {
        _id
        createdAt
        username
        commentText
      }
    }
  }
`
