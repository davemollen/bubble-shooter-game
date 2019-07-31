import React, { useContext } from 'react'
import { GameContext } from '../contexts/GameContext'
import ScoreForm from './ScoreForm'
import { initializeGame, setGameStatus } from '../actions/gameActions'

const StartGame: React.FC = () => {
  const { state, dispatch }: any = useContext(GameContext)
  const { gameStatus, score, highScores } = state

  const onStart = () => {
    dispatch(setGameStatus('active'))
  }

  const onStartAgain = () => {
    dispatch(initializeGame())
    dispatch(setGameStatus('active'))
  }

  if(gameStatus === 'inactive'){
    return (
      <div className='gameStatus'>
        <button onClick={onStart}>START GAME</button>
      </div>
    )
  }

  if(gameStatus === 'finished'){
    if(highScores.length < 5 || score > highScores[4]){
      return (
        <div className='gameStatus'>
          <span>new highscore!</span>
          <ScoreForm />
        </div>
      )
    }
    return (
      <div className='gameStatus'>
        <span>well done!</span>
        <button onClick={onStartAgain}>START AGAIN</button>
      </div>
    )
  }

  if(gameStatus === 'gameover'){
    return <div className='gameStatus'>
      <span>game over</span>
      <button onClick={onStartAgain}> START AGAIN</button>
    </div>
  }

  return (
    <></>
  )
}

export default StartGame
