import { useEffect, useState } from 'react'

export function AddtoLeague () {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  useEffect(() => {
    setError(false)
  }, [code])
  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:8080/addUserToLeague', {
      method: 'PATCH',
      headers: {
        /* global localStorage */
        /* eslint no-undef: "error" */
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code })
    })
      .catch(
        setError(true)
      )
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='formContent'>
        <label htmlFor='code'>Código de la liga</label>
        <input type='text' id='code' value={code} onChange={(e) => setCode(e.target.value)} />
        <p className={error ? 'invalid-input-p' : 'valid-input-p'}>El código de invitación no existe</p>
      </div>
      <button type='submit'>Añadir</button>
    </form>
  )
}
