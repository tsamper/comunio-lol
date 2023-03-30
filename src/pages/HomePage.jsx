export function HomePage (props) {
  return (
    <>
      {!props.loggedIn && <h1>Bienvenido a esta nuestra web</h1>}
      {props.loggedIn && <h1>Bienvenido, </h1>}
    </>
  )
}
