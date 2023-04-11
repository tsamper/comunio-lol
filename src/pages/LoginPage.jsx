import { LoginForm } from '../components/LoginForm'
import { Redirect } from '../components/Redirect'

export function LoginPage (props) {
  return (
    <>
      {!props.loggedIn
        /* eslint-disable-next-line */
        ? 
          <div className='login'>
            <h2>Login</h2>
            <LoginForm />
          </div>
        : <Redirect string='/' />}
    </>
  )
}
