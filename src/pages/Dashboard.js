import React from 'react'
import { Info, Repos, User, Search, Navbar } from '../components'
import loadingImage from '../images/preloader.gif'
import { GithubContext, useGlobalContext } from '../context/context'
import Followers from '../components/Followers'
const Dashboard = () => {
  const { isLoading } = useGlobalContext()
  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src={loadingImage} alt='loading' className='loading-img' />
      </main>
    )
  }
  return (
    <main>
      <Navbar></Navbar>
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  )
}

export default Dashboard
