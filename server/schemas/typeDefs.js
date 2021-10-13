// import the gql tagged template function
const { gql } = require('apollo-server-express')

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    profilePicture: String
    coverPicture: String
    followers: [User]
    followings: [User]
    desc: String
    city: String
    from: String
    posts: [Post]
  }

  type Post {
    _id: ID
    postText: String
    createdAt: String
    username: String
    likes: [String]
    img: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(_id: ID!): Post
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    editUser(
      profilePicture: String
      coverPicture: String
      desc: String
      city: String
      from: String
    ): User
    addPost(postText: String!): Post
    addComment(postId: ID!, commentText: String!): Post
    deletePost(postId: ID!): Post
    follow(friendId: ID!): [User]
    unfollow(friendId: ID!): [User]
  }
`

// export the typeDefs
module.exports = typeDefs
