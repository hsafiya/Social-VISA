import './closeFriend.css'
import { Link } from 'react-router-dom'

export default function CloseFriend({ user }) {
  return (
    <li className="sidebarFriend">
      <Link to={`/profile/${user.username}`}>
        <img className="sidebarFriendImg" src={user.profilePicture} alt="" />
      </Link>
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  )
}
