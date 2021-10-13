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
import Auth from './utils/auth'

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  request: (operation) => {
    const token = localStorage.getItem('id_token')

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    })
  },
})
// const client = new ApolloClient({
//   request: operation => {
//     const token = localStorage.getItem('id_token');

//     operation.setContext({
//       headers: {
//         authorization: token ? `Bearer ${token}` : ''
//       }
//     });
//   },
//   uri: '/graphql'
// });

function App() {
  const loggedIn = Auth.loggedIn()

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Home /> : <Register />}
          </Route>
          <Route path="/login">
            {loggedIn ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/register">
            {loggedIn ? <Redirect to="/" /> : <Register />}
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
