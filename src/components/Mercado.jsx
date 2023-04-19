import * as React from 'react'
import { useEffect, useState } from 'react'

export function Mercado (props) {
  const [players, setPlayers] = useState('')

  useEffect(() => {
    setPlayers(props.players)
  })

  const handleClick = (player) => {
    fetch('http://localhost:8080/buyPlayer', {
      method: 'POST',
      headers: {
        /* global localStorage */
        /* eslint no-undef: "error" */
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(player)
    })
  }
  return (
    <>
      <h2>Mercado</h2>
      {players === ''
        ? <p>No hay juadores</p>
        /* eslint-disable-next-line */
        : 
        <ul>
          {players.map((player) => (
            <div key={player.id} className='jugadoresMercado'>
              <li>{player.username} - {player.role} - {player.price}</li>
              <button className='smallButton' onClick={() => handleClick(player)}>Comprar</button>
            </div>
          ))}
        </ul>}
    </>
  )
}
