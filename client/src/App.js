import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import Register from './pages/register/Register'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import Messenger from './pages/messenger/Messenger'

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

function App() {
  const { user } = useContext(AuthContext)
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Register />}
          </Route>
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route path="/messenger">
            {!user ? <Redirect to="/" /> : <Messenger />}
          </Route>
          <Route path="/profile/:username">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default App
