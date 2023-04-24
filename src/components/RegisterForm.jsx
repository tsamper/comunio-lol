import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function RegisterForm () {
  const [name, setName] = useState('')
  const [firstSurname, setFirstSurname] = useState('')
  const [secondSurname, setSecondSurname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [nameValid, setNameValid] = useState('false')
  const [firstSurnameValid, setFirstSurnameValid] = useState('false')
  const [secondSurnameValid, setSecondSurnameValid] = useState('false')
  const [usernameValid, setUsernameValid] = useState('false')
  const [passwordValid, setPasswordValid] = useState('false')
  const [emailValid, setEmailValid] = useState('false')
  const [users, setUsers] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8080/getAllUsersNameAndEmail')
      .then(response => response.json())
      .then(data => setUsers(data))
  }, [])

  useEffect(() => {
    if (name === '') {
      setNameValid(true)
      return
    }
    const nameRegex = /^[a-zA-Z]+$/
    const isNameValid = nameRegex.test(name)
    setNameValid(isNameValid)
  }, [name])

  useEffect(() => {
    if (firstSurname === '') {
      setFirstSurnameValid(true)
      return
    }
    const firstSurnameRegex = /^[a-zA-Z]+$/
    const isFirstSurnameValid = firstSurnameRegex.test(name)
    setFirstSurnameValid(isFirstSurnameValid)
  }, [firstSurname])

  useEffect(() => {
    if (secondSurname === '') {
      setSecondSurnameValid(true)
      return
    }
    const secondSurnameRegex = /^[a-zA-Z]+$/
    const isSecondSurnameValid = secondSurnameRegex.test(name)
    setSecondSurnameValid(isSecondSurnameValid)
  }, [secondSurname])

  useEffect(() => {
    if (username === '') {
      return
    }
    const usernameRegex = /^[a-zA-Z0-9]+$/
    const isUsernameValid = usernameRegex.test(username)
    const isUsernameUnique = users.some(user => user.username === username)
    setUsernameValid(isUsernameValid && !isUsernameUnique)
  }, [username])

  useEffect(() => {
    let isPasswordValid = false
    if (password === confirmPassword) {
      isPasswordValid = true
    }
    setPasswordValid(isPasswordValid)
  }, [confirmPassword])

  useEffect(() => {
    const isEmailUnique = users.some(user => user.email === email)
    setEmailValid(!isEmailUnique)
  }, [email])

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, firstSurname, secondSurname, username, password, email })
    })
    setName('')
    setFirstSurname('')
    setSecondSurname('')
    setUsername('')
    setPassword('')
    setConfirmPassword('')
    setEmail('')

    navigate('/')
  }
  return (
    <form onSubmit={handleSubmit} className='defaultForm'>
      <div className='formContent'>
        <label htmlFor='name'>Nombre:</label>
        <input className={nameValid ? '' : 'invalid-input'} type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} />
        <p className={nameValid ? 'valid-input-p' : 'invalid-input-p'}>Nombre incorrecto</p>
        <label htmlFor='firstSurname'>Primer apellido:</label>
        <input className={firstSurnameValid ? '' : 'invalid-input'} type='text' id='firstSurname' value={firstSurname} onChange={(e) => setFirstSurname(e.target.value)} />
        <p className={firstSurnameValid ? 'valid-input-p' : 'invalid-input-p'}>Apellido incorrecto</p>
        <label htmlFor='secondSurname'>Segundo apellido:</label>
        <input className={secondSurnameValid ? '' : 'invalid-input'} type='text' id='secondSurname' value={secondSurname} onChange={(e) => setSecondSurname(e.target.value)} />
        <p className={secondSurnameValid ? 'valid-input-p' : 'invalid-input-p'}>Apellido incorrecto</p>
        <label htmlFor='username'>Nombre de usuario:</label>
        <input className={usernameValid ? '' : 'invalid-input'} type='text' id='username' value={username} required onChange={(e) => setUsername(e.target.value)} />
        <p className={usernameValid ? 'valid-input-p' : 'invalid-input-p'}>Nombre de usuario en uso</p>
        <label htmlFor='password'>Contraseña:</label>
        <input type='password' id='paswword' value={password} required onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor='confirmPassword'>Repite la contraseña:</label>
        <input className={passwordValid ? '' : 'invalid-input'} type='password' id='confirmPaswword' value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} />
        <p className={passwordValid ? 'valid-input-p' : 'invalid-input-p'}>Contraseña diferente</p>
        <label htmlFor='email'>Email:</label>
        <input className={emailValid ? '' : 'invalid-input'} type='email' id='email' value={email} required onChange={(e) => setEmail(e.target.value)} />
        <p className={emailValid ? 'valid-input-p' : 'invalid-input-p'}>Email en uso</p>
      </div>
      <button type='submit' disabled={!usernameValid || !passwordValid || !emailValid}>Registro</button>
    </form>
  )
}
