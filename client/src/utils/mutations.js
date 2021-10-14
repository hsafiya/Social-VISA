import gql from 'graphql-tag'

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`

export const ADD_POST = gql`
  mutation addPost($postText: String!) {
    addPost(postText: $postText) {
      _id
      postText
      createdAt
      username
      comments {
        _id
      }
    }
  }
`

export const ADD_COMMENT = gql`
  mutation addcomment($postId: ID!, $commentText: String!) {
    addcomment(postId: $postId, commentText: $commentText) {
      _id
      comments {
        _id
        commentText
        createdAt
        username
      }
    }
  }
`

export const ADD_FRIEND = gql`
  mutation follow($id: ID!) {
    follow(friendId: $id) {
      _id
      username
      followings {
        _id
        username
      }
    }
  }
`

export const REMOVE_FRIEND = gql`
  mutation unfollow($id: ID!) {
    unfollow(friendId: $id) {
      _id
      username
      followings {
        _id
        username
      }
    }
  }
`
