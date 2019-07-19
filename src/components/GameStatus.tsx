import React, { useContext } from 'react'
import { GameContext } from '../contexts/GameContext'
import ScoreForm from './ScoreForm'

const StartGame: React.FC = () => {
  const { state, dispatch }: any = useContext(GameContext)
  const { gameStatus } = state

  const handleClick = () => {
    dispatch({
      type: 'GAME_STATUS',
      payload: {
        gameStatus: 'active'
      }
    })
  }

  if(gameStatus === 'inactive'){
    return (
      <div className='gamestatus'>
        <button onClick={handleClick}>START GAME</button>
      </div>
    )
  }

  if(gameStatus === 'finished'){
    return (
      <div className='gamestatus'>
        <ScoreForm />
      </div>
    )
  }

  return (
    <></>
  )
}

export default StartGame
