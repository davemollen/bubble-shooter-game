import React, { useEffect, useContext } from 'react'
import { GameContext } from '../contexts/GameContext'
import { setGameStatus, setCountDown } from '../actions/gameActions'

const Timer: React.FC = () => {
  const { state, dispatch }: any = useContext(GameContext)
  const { gameStatus, score, countDown } = state
    
  useEffect(() => {
    let interval: number = 0;
    if (gameStatus === 'active') {
      interval = setInterval(() => {
        dispatch(setCountDown(countDown - 1))
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [countDown, gameStatus, dispatch]);

  if(countDown === 0 && gameStatus === 'active'){
    dispatch(setGameStatus('finished'))
  }

  const secondsToMinutes = (secondsInput: number): string => {
    const minutes: string = Math.floor(secondsInput / 60).toString().padStart(2, '0');
    const seconds: string = (secondsInput % 60).toString().padStart(2, '0');
    return minutes + ":" + seconds;
  }

  return (
    <div className='timer'>
      <h4>Time: {secondsToMinutes(countDown)}</h4>
      <h4>Score: {score}</h4>
    </div>
  )
}

export default Timer
