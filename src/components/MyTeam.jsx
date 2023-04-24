import { useEffect, useState } from 'react'

export function MyTeam (props) {
  const [top, setTop] = useState('')
  const [jng, setJng] = useState('')
  const [mid, setMid] = useState('')
  const [adc, setAdc] = useState('')
  const [sup, setSup] = useState('')
  const [selectedTeam, setSelectedTeam] = useState({
    top: '',
    jng: '',
    mid: '',
    adc: '',
    sup: ''
  })
  const [selectedTop, setSelectedTop] = useState('')
  const [selectedJng, setSelectedJng] = useState('')
  const [selectedMid, setSelectedMid] = useState('')
  const [selectedAdc, setSelectedAdc] = useState('')
  const [selectedSup, setSelectedSup] = useState('')

  useEffect(() => {
    fetch(`http://localhost:8080/getPlayersByRole/${props.code}&top`, {
      method: 'GET',
      cache: 'no-store',
      headers: new Headers({
        /* global localStorage */
        /* eslint no-undef: "error" */
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    })
      .then(response => response.json())
      .then(data => {
        setTop(data)
        if (data[0] !== undefined) {
          setSelectedTop(data[0].username)
        }
      })
    fetch(`http://localhost:8080/getPlayersByRole/${props.code}&jng`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    })
      .then(response => response.json())
      .then(data => {
        setJng(data)
        if (data[0] !== undefined) {
          setSelectedJng(data[0].username)
        }
      })
    fetch(`http://localhost:8080/getPlayersByRole/${props.code}&mid`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    })
      .then(response => response.json())
      .then(data => {
        setMid(data)
        if (data[0] !== undefined) {
          setSelectedMid(data[0].username)
        }
      })
    fetch(`http://localhost:8080/getPlayersByRole/${props.code}&adc`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    })
      .then(response => response.json())
      .then(data => {
        setAdc(data)
        if (data[0] !== undefined) {
          setSelectedAdc(data[0].username)
        }
      })
    fetch(`http://localhost:8080/getPlayersByRole/${props.code}&sup`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    })
      .then(response => response.json())
      .then(data => {
        setSup(data)
        if (data[0] !== undefined) {
          setSelectedSup(data[0].username)
        }
      })
  }, [])

  useEffect(() => {
    setSelectedTeam({
      top: selectedTop,
      jng: selectedJng,
      mid: selectedMid,
      adc: selectedAdc,
      sup: selectedSup
    })
  }, [selectedTop, selectedJng, selectedMid, selectedAdc, selectedSup])

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log(selectedTeam)
    if (selectedTop !== '' && selectedJng !== '' && selectedMid !== '' && selectedAdc !== '' && selectedSup !== '') {
      fetch(`http://localhost:8080/submitMyTeam/${props.code}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedTeam)
      })
    } else {
      console.log('Escoge posición para todo el equipo')
    }
  }
  return (
    <>
      <div className='ladoMap'>
        <h2>Mi equipo</h2>
        <form onSubmit={handleSubmit}>
          <div className='leagueMap'>
            <select id='topSelect' className='myTeamForm' name='top' onChange={(e) => setSelectedTop(e.target.value)}>
              {top === '' ? <option>Sin jugadores</option> : top.map((t) => <option key={t.id} value={t.username}>{t.username}</option>)}
            </select>
            <select id='jngSelect' className='myTeamForm' name='jng' onChange={(e) => setSelectedJng(e.target.value)}>
              {jng === '' ? <option>Sin jugadores</option> : jng.map((j) => <option key={j.id} value={j.username}>{j.username}</option>)}
            </select>
            <select id='midSelect' className='myTeamForm' name='mid' defaultValue={mid[0]} onChange={(e) => setSelectedMid(e.target.value)}>
              {mid === '' ? <option>Sin jugadores</option> : mid.map((m) => <option key={m.id} value={m.username}>{m.username}</option>)}
            </select>
            <select id='adcSelect' className='myTeamForm' name='adc' onChange={(e) => setSelectedAdc(e.target.value)}>
              {adc === '' ? <option>Sin jugadores</option> : adc.map((a) => <option key={a.id} value={a.username}>{a.username}</option>)}
            </select>
            <select id='supSelect' className='myTeamForm' name='sup' onChange={(e) => setSelectedSup(e.target.value)}>
              {sup === '' ? <option>Sin jugadores</option> : sup.map((s) => <option key={s.id} value={s.username}>{s.username}</option>)}
            </select>
          </div>
          <button>Actualizar</button>
        </form>
      </div>
    </>
  )
}
