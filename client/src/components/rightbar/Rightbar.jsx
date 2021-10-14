import './rightbar.css'
import Online from '../online/Online'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Add, Remove } from '@material-ui/icons'

import Auth from '../../utils/auth'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { QUERY_ME, QUERY_USER } from '../../utils/queries'
import { ADD_FRIEND, REMOVE_FRIEND } from '../../utils/mutations'

export default function Rightbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [followed, setFollowed] = useState(false)

  const { username: userParam } = useParams()
  const [addFriend] = useMutation(ADD_FRIEND)
  const [removeFriend] = useMutation(REMOVE_FRIEND)

  const { data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  })
  const user = data?.me || data?.user || {}
  // console.log(user)

  const profile = Auth.getProfile()

  const handleClick = async () => {
    try {
      if (!followed) {
        await addFriend({
          variables: { username: user.username },
        })
      } else {
        await removeFriend({
          variables: { username: user.username },
        })
      }
      setFollowed(!followed)
    } catch (err) {}
  }

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Denisse Black</b> and <b>1 other friends</b> have a birhday
            today.
          </span>
        </div>
        <img className="rightbarAd" src={`${PF}/ad.png`} alt="" />
        <h4 className="rightbarTitle">Your Friends</h4>
        <ul className="rightbarFriendList">
          {user.friends
            ? user.friends.map((u, i) => <Online key={i} user={u} />)
            : null}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== profile.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? 'Unfollow' : 'Follow'}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? 'Single'
                : user.relationship === 2
                ? 'Married'
                : '-'}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {user.friends
            ? user.friends.map((friend) => (
                <Link
                  to={'/profile/' + friend.username}
                  style={{ textDecoration: 'none' }}
                  key={friend._id}
                >
                  <div className="rightbarFollowing">
                    <img
                      src={
                        friend.profilePicture
                          ? friend.profilePicture
                          : PF + 'person/noAvatar.png'
                      }
                      alt=""
                      className="rightbarFollowingImg"
                    />
                    <span className="rightbarFollowingName">
                      {friend.username}
                    </span>
                  </div>
                </Link>
              ))
            : null}
        </div>
      </>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {userParam ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}
