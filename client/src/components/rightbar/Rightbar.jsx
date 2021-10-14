import './rightbar.css'
import { Users } from '../../dummyData'
import Online from '../online/Online'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Add, Remove } from '@material-ui/icons'

import Auth from '../../utils/auth'
import { useQuery } from '@apollo/react-hooks'
import { QUERY_ME, QUERY_USER } from '../../utils/queries'

export default function Rightbar({ user }) {
  const { data: userData } = useQuery(QUERY_ME)
  const me = userData?.me || {}
  // console.log(me)

  const profile = Auth.getProfile()

  // useEffect(() => {
  //   const getFriends = async () => {
  //     try {
  //       const friendList = await axios.get('/users/friends/' + user._id)
  //       setFriends(friendList.data)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   getFriends()
  // }, [user])

  // const handleClick = async () => {
  //   try {
  //     if (followed) {
  //       await axios.put(`/users/${user._id}/unfollow`, {
  //         userId: currentUser._id,
  //       })
  //       dispatch({ type: 'UNFOLLOW', payload: user._id })
  //     } else {
  //       await axios.put(`/users/${user._id}/follow`, {
  //         userId: currentUser._id,
  //       })
  //       dispatch({ type: 'FOLLOW', payload: user._id })
  //     }
  //     setFollowed(!followed)
  //   } catch (err) {}
  // }

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Your Friends</h4>
        <ul className="rightbarFriendList">
          {me.followings
            ? me.followings.map((u, i) => <Online key={i} user={u} />)
            : Users.map((u) => <Online key={u.id} user={u} />)}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    return (
      <>
        {/* {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? 'Unfollow' : 'Follow'}
            {followed ? <Remove /> : <Add />}
          </button>
        )} */}
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
          {/* {friends.map((friend) => (
            <Link
              to={'/profile/' + friend.username}
              style={{ textDecoration: 'none' }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + 'person/noAvatar.png'
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))} */}
        </div>
      </>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}
