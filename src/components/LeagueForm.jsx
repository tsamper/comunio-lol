import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function LeagueForm () {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [leagueType, setLeagueType] = useState('LVP')
  const [Leagues, setLeagues] = useState(null)
  const [validCode, setValidCode] = useState('false')
  const [leaguesCode, setLeaguesCode] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8080/getTypeOfLeagues', {
      method: 'GET',
      headers: new Headers({
      /* global localStorage */
      /* eslint no-undef: "error" */
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    })
      .then(response => response.json())
      .then(data => setLeagues(data))
  }, [])

  useEffect(() => {
    fetch('http://localhost:8080/getAllCodes', {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    })
      .then(response => response.json())
      .then(data => setLeaguesCode(data))
  }, [])
  useEffect(() => {
    if (code === '') {
      return
    }
    const codeRegex = /^[a-zA-Z0-9]{5}$/
    const isCodeValid = codeRegex.test(code)
    let isCodeUnique = true
    if (leaguesCode != null) {
      isCodeUnique = leaguesCode.some(codes => codes === code)
    } else {
      isCodeUnique = false
    }
    setValidCode(!isCodeUnique && isCodeValid)
  }, [code])

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(name)
    console.log(code)
    console.log(leagueType)
    fetch('http://localhost:8080/newLeague', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, code, leagueType })
    })
    navigate('/')
  }
  return (
    <form onSubmit={handleSubmit} className='defaultForm'>
      <div className='formContent'>
        <label htmlFor='name'>Nombre:</label>
        <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} required />
        <label htmlFor='code'>Código de invitación (5 caracteres):</label>
        <input className={validCode ? '' : 'invalid-input'} type='text' id='code' value={code} onChange={(e) => setCode(e.target.value)} required />
        <p className={validCode ? 'valid-input-p' : 'invalid-input-p'}>Código invalido o repetido</p>
        <label htmlFor='leagueType'>Tipo de liga:</label>
        <select id='leagueType' onChange={(e) => setLeagueType(e.target.value)}>
          {Leagues
            ? Leagues.map((league) => (
              <option key={league} value={league}>{league}</option>
            ))
            : <option value='null'>Cargando ligas...</option>}
        </select>
      </div>
      <button type='submit' disabled={!validCode}>Enviar</button>
    </form>
  )
}
