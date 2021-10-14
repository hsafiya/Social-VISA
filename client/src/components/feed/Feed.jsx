import { useContext, useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'
// import axios from "axios";
import { AuthContext } from '../../context/AuthContext'
import { useQuery } from '@apollo/client'
import { QUERY_POSTS } from '../../utils/queries.js'

export default function Feed({ username }) {
  // const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext)

  const { loading, data } = useQuery(QUERY_POSTS)
  const posts = data?.posts || []
  console.log(posts)
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = username
  //       ? await axios.get("/posts/profile/" + username)
  //       : await axios.get("posts/timeline/" + user._id);
  //     setPosts(
  //       res.data.sort((p1, p2) => {
  //         return new Date(p2.createdAt) - new Date(p1.createdAt);
  //       })
  //     );
  //   };
  //   fetchPosts();
  // }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* {(!username || username === user.username) && <Share />} */}
        {/* {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))} */}
        Posts
      </div>
    </div>
  )
}
