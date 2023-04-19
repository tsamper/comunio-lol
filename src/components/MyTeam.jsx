import { useState } from 'react'

export function MyTeam () {
  const [top, setTop] = useState('')
  const [jng, setJng] = useState('')
  const [mid, setMid] = useState('')
  const [adc, setAdc] = useState('')
  const [sup, setSup] = useState('')
  return (
    <>
      <div className='ladoMap'>
        <h2>Mi equipo</h2>
        <div className='leagueMap'>
          <select id='topSelect' className='myTeamForm'>
            <option>1</option>
          </select>
          <select id='jngSelect' className='myTeamForm'>
            <option>1</option>
          </select>
          <select id='midSelect' className='myTeamForm'>
            <option>1</option>
          </select>
          <select id='adcSelect' className='myTeamForm'>
            <option>1</option>
          </select>
          <select id='supSelect' className='myTeamForm'>
            <option>1</option>
          </select>
        </div>
      </div>
    </>
  )
}
