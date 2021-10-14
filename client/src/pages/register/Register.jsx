// import axios from 'axios'
// import { useRef } from 'react'
import './register.css'
// import { useHistory } from 'react-router'

import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ADD_USER } from '../../utils/mutations'
import Auth from '../../utils/auth'

export default function Register() {
  // const username = useRef()
  // const email = useRef()
  // const password = useRef()
  // const passwordAgain = useRef()
  // const history = useHistory()

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [addUser, { error }] = useMutation(ADD_USER)

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target

    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const handleClick = async (e) => {
    e.preventDefault()

    try {
      const { data } = await addUser({
        variables: { ...formState },
      })

      Auth.login(data.addUser.token)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social VISA</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Social VISA.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              className="loginInput"
              name="username"
              type="username"
              id="username"
              value={formState.username}
              onChange={handleChange}
            />
            <input
              placeholder="Email"
              required
              className="loginInput"
              type="email"
              name="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
            />
            <input
              placeholder="Password"
              required
              className="loginInput"
              type="password"
              minLength="6"
              name="password"
              id="password"
              value={formState.password}
              onChange={handleChange}
            />
            <input
              placeholder="Password Again"
              required
              className="loginInput"
              type="password"
              name="password"
              id="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button
              className="loginRegisterButton"
              onClick={() => {
                window.location = '/login'
              }}
            >
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
