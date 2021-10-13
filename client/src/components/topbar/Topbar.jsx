import './topbar.css'
import {
  Search,
  Person,
  Chat,
  Notifications,
  Settings,
} from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Logout from '@mui/icons-material/Logout'

import Auth from '../../utils/auth'
import { useQuery } from '@apollo/react-hooks'
import { QUERY_ME_BASIC } from '../../utils/queries'

export default function Topbar() {
  const { data: userData, loading } = useQuery(QUERY_ME_BASIC)
  const me = userData?.me || {}

  console.log(me)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">Social VISA</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <Tooltip title="Friend Requests">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
          </Tooltip>
          <Tooltip title="Messages">
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">2</span>
            </div>
          </Tooltip>

          <Tooltip title="Notifications">
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
          </Tooltip>
        </div>

        <Tooltip title="Click for Options">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            {loading ? (
              <Avatar sx={{ width: 32, height: 32 }}>
                <img
                  src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                  alt=""
                  className="topbarImg"
                />
              </Avatar>
            ) : (
              <Avatar sx={{ width: 32, height: 32 }}>
                <img
                  src={
                    me.profilePicture
                      ? me.profilePicture
                      : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
                  }
                  alt=""
                  className="topbarImg"
                />
              </Avatar>
            )}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Link
            to={`/profile/${me.username}`}
            style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}
          >
            <MenuItem>
              <Avatar /> Profile
            </MenuItem>
          </Link>
          <MenuItem>
            <Avatar /> My account
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <Link
              to={`/`}
              onClick={(e) => {
                e.preventDefault()
                Auth.logout()
              }}
              style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}
            >
              Logout
            </Link>
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
}
