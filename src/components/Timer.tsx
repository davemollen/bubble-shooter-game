import React, { useState, useEffect, useContext } from 'react'
import { GameContext } from '../contexts/GameContext'

const Timer: React.FC = () => {
  const { state, dispatch }: any = useContext(GameContext)
  const { gameStatus, score } = state
  const [timer, setTimer] = useState(120)
    
  useEffect(() => {
    let interval: any = null;
    if (gameStatus === 'active') {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, gameStatus]);

  if(timer === 0 && gameStatus === 'active'){
    dispatch({
      type: 'GAME_STATUS',
      payload: {
        ...state,
        gameStatus: 'finished'
      }
    })
  }

  const secondsToMinutes = (secondsInput: number): string => {
    const minutes: string = '0' + Math.floor(secondsInput / 60);
    const seconds: string = '0' + (secondsInput % 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
  }

  return (
    <div className='timer'>
      <h4>Time: {secondsToMinutes(timer)}</h4>
      <h4>Score: {score}</h4>
    </div>
  )
}

export default Timer
