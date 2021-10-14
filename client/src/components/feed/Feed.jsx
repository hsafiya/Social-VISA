import { useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'
import { useQuery } from '@apollo/client'
import { QUERY_POSTS } from '../../utils/queries.js'
import Auth from '../../utils/auth'

export default function Feed({ username }) {
  const { loading, data } = useQuery(QUERY_POSTS)
  const posts = data?.posts || []
  console.log(posts)
  const loggedIn = Auth.loggedIn()

  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* {(!username || username === user.username) && <Share />} */}

        {loading ? (
          <div>Loading...</div>
        ) : (
          posts.map((p) => <Post key={p._id} post={p} />)
        )}
      </div>
    </div>
  )
}
