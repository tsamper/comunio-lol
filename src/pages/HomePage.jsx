import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function HomePage (props) {
  const [leagues, setLeagues] = useState()
  const navigate = useNavigate()

  if (localStorage.getItem('token')) {
    useEffect(() => {
      fetch('http://localhost:8080/getLeaguesFromUser', {
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
  }
  const handleClick = () => {
    navigate('/newleague')
  }
  return (
    <>
      {!props.loggedIn && <h1>Bienvenido a esta nuestra web</h1>}
      {props.loggedIn &&
        <div className='homeContent'>
          <h1>Bienvenido, {props.activeUser.username}</h1>
          <h2>Mis ligas</h2>
          {leagues
          /* eslint-disable-next-line */
            ? 
              <ul className='leagues'>
                {leagues.map((league) => (
                  <li key={league.id}><Link to={`league/${league.code}`}>{league.name}</Link></li>
                ))}
              </ul>
            : <p>No tienes ninguna liga</p>}
          <button onClick={handleClick}>Nueva liga</button>
        </div>}
    </>
  )
}
