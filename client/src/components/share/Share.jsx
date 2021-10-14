import './share.css'
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from '@material-ui/icons'
import { useState } from 'react'
// import axios from "axios";
import { useMutation, useQuery } from '@apollo/react-hooks'
import { ADD_POST } from '../../utils/mutations'
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries'

export default function Share() {
  const { data: userData } = useQuery(QUERY_ME)
  const me = userData?.me || {}
  const [postText, setPostText] = useState('')
  const [characterCount, setCharacterCount] = useState(0)

  const [addPost] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        // update thought array's cache
        // could potentially not exist yet, so wrap in a try/catch
        const { posts } = cache.readQuery({ query: QUERY_POSTS })
        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [addPost, ...posts] },
        })

        // update me object's cache
        const { me } = cache.readQuery({ query: QUERY_ME })
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, posts: [...me.posts, addPost] } },
        })
      } catch (e) {
        console.error(e)
      }
    },
  })

  // submit form
  const submitHandler = async (event) => {
    event.preventDefault()

    try {
      await addPost({
        variables: { postText },
      })

      // clear form value
      setPostText('')
      setCharacterCount(0)
      window.location.reload()
    } catch (e) {
      console.error(e)
    }
  }

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setPostText(event.target.value)
      setCharacterCount(event.target.value.length)
    }
  }

  const [file, setFile] = useState(null)

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   const newPost = {
  //     userId: user._id,
  //     desc: desc.current.value,
  //   };
  //   if (file) {
  //     const data = new FormData();
  //     const fileName = Date.now() + file.name;
  //     data.append("name", fileName);
  //     data.append("file", file);
  //     newPost.img = fileName;
  //     console.log(newPost);
  //     try {
  //       await axios.post("/upload", data);
  //     } catch (err) {}
  //   }
  //   try {
  //     await axios.post("/posts", newPost);
  //     window.location.reload();
  //   } catch (err) {}
  // };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={me.profilePicture} alt="" />
          <textarea
            placeholder={"What's in your mind " + me.username + '?'}
            value={postText}
            className="shareInput"
            onChange={handleChange}
          ></textarea>
          {/* <input /> */}
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: 'none' }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  )
}
