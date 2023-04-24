import { useParams } from 'react-router-dom'
import { Redirect } from '../components/Redirect'
import { useEffect, useState } from 'react'
import { MyTeam } from '../components/MyTeam'
import { Mercado } from '../components/Mercado'
import { Clasificacion } from '../components/Clasificacion'

export function LeaguePage (props) {
  const [league, setLeague] = useState('')
  const [players, setPlayers] = useState('')
  const { code } = useParams()

  useEffect(() => {
    fetch(`http://localhost:8080/getLeague/${code}`, {
      method: 'GET',
      headers: new Headers({
        /* global localStorage */
        /* eslint no-undef: "error" */
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    })
      .then(response => response.json())
      .then(data => setLeague(data))
  }, [])
  useEffect(() => {
    fetch(`http://localhost:8080/getPlayersWithoutOwner/${code}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    })
      .then(response => response.json())
      .then(data => setPlayers(data))
  }, [league])

  return (
    <>
      {props.loggedIn &&
        <>
          <h1>Liga {league.name}</h1>
          <div className='leagueContent'>
            <MyTeam code={code} />
            <div className='ladoMercado'>
              <Mercado players={players} code={code} />
              <Clasificacion />
            </div>
          </div>
        </>}
      {!props.loggedIn && <Redirect />}
    </>
  )
}
