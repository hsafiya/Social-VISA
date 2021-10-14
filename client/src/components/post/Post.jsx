import './post.css'
import { MoreVert } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { QUERY_USER, QUERY_ME } from '../../utils/queries'

export default function Post({ post }) {
  // console.log(post)

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: post.username },
  })
  const user = data?.user || {}

  const [like, setLike] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  // const { user: currentUser } = useContext(AuthContext)

  // useEffect(() => {
  //   setIsLiked(post.likes.includes(currentUser._id))
  // }, [currentUser._id, post.likes])

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await axios.get(`/users?userId=${post.userId}`);
  //     setUser(res.data);
  //   };
  //   fetchUser();
  // }, [post.userId]);

  // const likeHandler = () => {
  //   try {
  //     axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
  //   } catch (err) {}
  //   setLike(isLiked ? like - 1 : like + 1);
  //   setIsLiked(!isLiked);
  // };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${post.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + 'person/noAvatar.png'
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{post.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.postText}</span>
          {/* <img className="postImg" src={PF + post.img} alt="" /> */}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}/like.png`}
              // onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}/heart.png`}
              // onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {post?.comments.length || 0} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
