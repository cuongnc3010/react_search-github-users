import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { GithubProvider } from './context/context'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthWrapper } from './pages'

//dev-bo4v69-4.us.auth0.com
// PxfZFdOha8xZ8ZZqYXYoFpc2TQcpJUwc
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-bo4v69-4.us.auth0.com'
      clientId='PxfZFdOha8xZ8ZZqYXYoFpc2TQcpJUwc'
      redirectUri={window.location.origin}
      cacheLocation='localstorage'
    >
      <AuthWrapper>
        <Router>
          <GithubProvider>
            <App />
          </GithubProvider>
        </Router>
      </AuthWrapper>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
