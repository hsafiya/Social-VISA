import './online.css'

export default function Online({ user }) {
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(user)
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={user.profilePicture} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  )
}
