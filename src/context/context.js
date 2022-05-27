import React, { useState, useEffect, useContext } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'
const GithubContext = React.createContext()

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)
  // request,loading
  const [requests, setRequests] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  //error
  const [error, setError] = useState({ show: false, msg: '' })

  const searchGithubUser = async (user) => {
    toggleError()
    setIsLoading(true)
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) => {
      console.log(err)
    })
    if (response) {
      setGithubUser(response.data)
      const { repos_url, followers_url } = response.data
      // //repos
      // axios(`${repos_url}?per_page=100`).then((response) =>
      //   setRepos(response.data)
      // )
      // //follower
      // axios(`${followers_url}?per_page=100`).then((response) =>
      //   setFollowers(response.data)
      // )

      //sync APIs calling
      await Promise.allSettled([
        axios(`${repos_url}?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          console.log(results)
          const [repos, followers] = results
          const status = 'fulfilled'
          if (repos.status === status) {
            setRepos(repos.value.data)
          }
          if (followers.status === status) {
            setFollowers(followers.value.data)
          }
        })
        .catch((err) => console.log(err))
    } else {
      toggleError(true, 'There is no username match entered value')
    }
    setIsLoading(false)
  }

  // check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      //destruct "data" property in requested result object
      .then(({ data }) => {
        let { remaining } = data.rate //{rate:{remaining}} = data
        setRequests(remaining)
        if (remaining === 0) {
          toggleError(true, 'Your have exceeded your hourly rate limit')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const toggleError = (show = false, msg = '') => {
    setError({ show, msg })
  }
  // set error state over here
  useEffect(checkRequests, [])
  return (
    <GithubContext.Provider
      value={{
        isLoading,
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(GithubContext)
}
export { useGlobalContext, GithubProvider }
