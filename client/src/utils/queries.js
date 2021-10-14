import gql from 'graphql-tag'

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

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
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
export const QUERY_USERS = gql`
  {
    users {
      _id
      username
      profilePicture
    }
  }
`

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      followers {
        _id
        username
      }
      followings {
        _id
        username
      }
      posts {
        _id
        postText
        createdAt
      }
      profilePicture
    }
  }
`

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      profilePicture
      coverPicture
      desc
      city
      from
      posts {
        _id
        postText
        createdAt
        comments {
          _id
          createdAt
          commentText
          username
        }
      }
      followers {
        _id
        username
      }
      followings {
        _id
        username
        profilePicture
      }
    }
  }
`

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      profilePicture
    }
  }
`
