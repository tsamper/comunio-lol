import { Redirect } from '../components/Redirect'

export function ProfilePage (props) {
  return (
    <>
      {props.loggedIn && <h1>usuario registrado</h1>}
      {!props.loggedIn && <Redirect />}
    </>
  )
}
