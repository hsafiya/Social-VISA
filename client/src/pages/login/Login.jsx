import { useState } from 'react'
import './login.css'

import Auth from '../../utils/auth'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN_USER } from '../../utils/mutations'

export default function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login] = useMutation(LOGIN_USER)

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
      const { data } = await login({
        variables: { ...formState },
      })

      Auth.login(data.login.token)
    } catch (e) {
      console.error(e)
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    })
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
              placeholder="Email"
              name="email"
              type="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="loginInput"
            />
            <input
              required
              minLength="6"
              className="loginInput"
              placeholder="Password"
              name="password"
              type="password"
              id="password"
              value={formState.password}
              onChange={handleChange}
            />
            <button className="loginButton" type="submit">
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button
              className="loginRegisterButton"
              onClick={() => {
                window.location = '/register'
              }}
            >
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
