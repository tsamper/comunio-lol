import { useNavigate } from 'react-router-dom'

export function HomePage (props) {
  const navigate = useNavigate()
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
          {props.activeUser.leagues
          /* eslint-disable-next-line */
            ? 
              <ul>
                {props.activeUser.leagues.map((league) => (
                  <li key={league.id}>{league.name}</li>
                ))}
              </ul>
            : <p>No tienes ninguna liga</p>}
          <button onClick={handleClick}>Nueva liga</button>
        </div>}
    </>
  )
}
