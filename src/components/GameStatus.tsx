import React, { useContext } from 'react'
import { GameContext } from '../contexts/GameContext'

const StartGame: React.FC = () => {
  const { state, dispatch }: any = useContext(GameContext)
  const { gameStatus } = state

  const handleClick = () => {
    dispatch({
      type: 'GAME_STATUS',
      payload: {
        ...state,
        gameStatus: 'active'
      }
    })
  }

  if(gameStatus === 'inactive'){
    return (
      <div className='overlay'>
        <div className='gamestatus'>
          <button onClick={handleClick}>START GAME</button>
        </div>
      </div> 
    )
  }

  if(gameStatus === 'finished'){
    return (
      <div className='overlay'>
        <div className='gamestatus'>
          <h1>GAME OVER</h1>
        </div>
      </div>
    )
  }

  return (
    <></>
  )
}

export default StartGame
