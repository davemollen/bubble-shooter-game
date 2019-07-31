import React, { useEffect, useContext } from 'react'
import { GameContext } from '../contexts/GameContext'
import { setGameStatus, setCountDown } from '../actions/gameActions'
import Loading from './Loading'

const Timer: React.FC = () => {
  const { state, dispatch }: any = useContext(GameContext)
  const { gameStatus, score, countDown } = state

  useEffect(() => {
    let interval: any = 0;
    if (gameStatus === 'active') {
      interval = setInterval(() => {
        dispatch(setCountDown(countDown))
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval)
  }, [countDown, gameStatus, dispatch])

  if(!countDown){
    return <Loading/>
  }

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
      <h2>Time</h2>
      <h4>{secondsToMinutes(countDown)}</h4>
      <h2>Score</h2>
      <h4>{score}</h4>
    </div>
  )
}

export default Timer
