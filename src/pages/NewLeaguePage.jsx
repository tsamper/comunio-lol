import { AddtoLeague } from '../components/AddtoLeague'
import { LeagueForm } from '../components/LeagueForm'
import { Redirect } from '../components/Redirect'

export function NewLeaguePage (props) {
  return (
    <>
      {props.loggedIn &&
        <div className='newleague'>
          <h2>Añadir nueva liga</h2>
          <LeagueForm />
          <h2>O únete a una liga ya creada</h2>
          <AddtoLeague />
        </div>}
      {!props.loggedIn && <Redirect string='/login' />}
    </>
  )
}
