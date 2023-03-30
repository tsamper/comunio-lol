import { Link } from 'react-router-dom'

export function Header (props) {
  const handleClick = () => {
    /* global localStorage */
    /* eslint no-undef: "error" */
    fetch('http://localhost:8080/logoout', {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    })
    const timer = setTimeout(() => {
      localStorage.removeItem('token')
      window.location.reload()
    }, 500)
    return () => clearTimeout(timer)
  }
  return (
    <header>
      <div className='headerContent'>
        <p className='logoPagina'><Link to='/'>Comunio LOL</Link></p>
        <nav>
          <ul>
            {!props.loggedIn && <li><Link to='/login'>Login</Link></li>}
            {!props.loggedIn && <li><Link to='/register'>Registro</Link></li>}
            {props.loggedIn && <li><Link to='/profile'>Perfil</Link></li>}
            {props.loggedIn && <li><Link onClick={handleClick} to='/'>Cerrar sesión</Link></li>}
          </ul>
        </nav>
      </div>
    </header>
  )
}
