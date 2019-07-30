import React, { useContext } from 'react'
import { GameContext } from '../contexts/GameContext'
import ScoreForm from './ScoreForm'
import { initializeGame, setGameStatus } from '../actions/gameActions'

const StartGame: React.FC = () => {
  const { state, dispatch }: any = useContext(GameContext)
  const { gameStatus } = state

  const onStart = () => {
    dispatch(setGameStatus('active'))
  }

  const onStartAgain = () => {
    dispatch(initializeGame())
    dispatch(setGameStatus('active'))
  }

  if(gameStatus === 'inactive'){
    return (
      <div className='gamestatus'>
        <button onClick={onStart}>START GAME</button>
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

  if(gameStatus === 'gameover'){
    return <div className='gamestatus'>
      <button onClick={onStartAgain}>START AGAIN</button>
    </div>
  }

  return (
    <></>
  )
}

export default StartGame
