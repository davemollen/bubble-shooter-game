import React, { useState, useContext } from 'react'
import Game from './Game'
import { GameContext } from '../contexts/GameContext'
import { shootBubble, removeBubbles } from '../actions/gameActions'

const GameContainer: React.FC = () => {
  const { state, dispatch }: any = useContext(GameContext)
  const { gameStatus} = state

  const [shoot, setShoot] = useState<boolean>(false)
  const [angle, setAngle] = useState<number>(0)

  const handleMousePosition = (event: MouseEvent) => {
    if(gameStatus !== 'active') return
    const updateAngle: number = angle + (event.movementX * 0.5)
    setAngle(
      updateAngle < -70 ? -70 : updateAngle > 70 ? 70 : updateAngle
    )
  }

  const handleMouseDown = () => {
    if(shoot || state.gameStatus !== 'active') return
    dispatch(shootBubble(angle, state))
    setShoot(true)
  }

  const handleTransitionEnd = () => {
    if(shoot){
      removeBubbles(state, dispatch)
      setShoot(false)
    }
  }

  return (
    <div>
      <Game 
        handleMousePosition={handleMousePosition} 
        handleMouseDown={handleMouseDown}
        handleTransitionEnd={handleTransitionEnd}
        angle={angle}
        shoot={shoot}
      />
    </div>
  )
}

export default GameContainer
