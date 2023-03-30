import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

function App () {
  const [loggedIn, setLoggedIn] = useState(false)
  const history = useNavigate()
  useEffect(() => {
    /* global localStorage */
    /* eslint no-undef: "error" */
    if (localStorage.getItem('token')) {
      setLoggedIn(true)
    }
  }, [history])
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main>
        <Routes>
          <Route path='/' element={<HomePage loggedIn={loggedIn} />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
