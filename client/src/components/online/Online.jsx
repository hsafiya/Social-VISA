import './online.css'
import { useQuery } from '@apollo/react-hooks'
import { QUERY_USER } from '../../utils/queries'

export default function Online({ user }) {
  const { data: userData } = useQuery(QUERY_USER, {
    variables: { username: user.username },
  })
  const friend = userData?.user || {}

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImg"
          src={friend?.profilePicture}
          alt=""
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{friend?.username}</span>
    </li>
  )
}
