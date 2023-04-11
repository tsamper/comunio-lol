import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function LoginForm () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginValid, setLoginValid] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    setLoginValid(true)
  }, [username, password])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if (!response.ok) {
        throw new Error('Error al iniciar sesión')
      }
      const data = await response.json()
      console.log('Inicio de sesión correcto')
      /* global localStorage */
      /* eslint no-undef: "error" */
      localStorage.setItem('token', data.token)
    } catch (error) {
      console.error(error)
      setLoginValid(false)
      return
    }
    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='formContent'>
        <label htmlFor='username'>Nombre de usuario:</label>
        <input type='text' id='username' value={username} required onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor='password'>Contraseña:</label>
        <input type='password' id='paswword' value={password} required onChange={(e) => setPassword(e.target.value)} />
        <p className={loginValid ? 'loginValid' : 'loginInvalid'}>Usuario o contraseña incorrectos</p>
      </div>
      <button disabled={!loginValid} type='submit'>Login</button>
    </form>
  )
}
