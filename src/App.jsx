import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ProfilePage } from './pages/ProfilePage'
import { NewLeaguePage } from './pages/NewLeaguePage'
import { LeaguePage } from './pages/LeaguePage'

function App () {
  const [loggedIn, setLoggedIn] = useState(false)
  const [activeUser, setActiveUser] = useState('')
  const history = useNavigate()
  useEffect(() => {
    /* global localStorage */
    /* eslint no-undef: "error" */
    if (localStorage.getItem('token')) {
      setLoggedIn(true)
      fetch('http://localhost:8080/getActiveUser', {
        method: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem('token')}`
        })
      })
        .then(response => response.json())
        .then(data => setActiveUser(data))
    }
  }, [history])
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main>
        <Routes>
          <Route path='/' element={<HomePage loggedIn={loggedIn} activeUser={activeUser} />} />
          <Route path='/login' element={<LoginPage loggedIn={loggedIn} />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/profile' element={<ProfilePage loggedIn={loggedIn} />} />
          <Route path='/newleague' element={<NewLeaguePage loggedIn={loggedIn} />} />
          <Route path='/league/:code' element={<LeaguePage loggedIn={loggedIn} />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
