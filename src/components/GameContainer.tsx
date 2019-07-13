import React, { useState, useContext } from 'react'
import Game from './Game'
import { GameContext } from '../contexts/GameContext'
import { shootBubble } from '../actions/gameActions'

const GameContainer: React.FC = () => {
  const { state, dispatch }: any = useContext(GameContext)

  const [localState, setAngle] = useState({
    angle: 0
  })

  const handleMousePosition = (event: MouseEvent) => {
    const updateAngle: number = localState.angle + (event.movementX * 0.5)
    setAngle({
      angle: updateAngle < -90 ? -90 : updateAngle > 90 ? 90 : updateAngle
    })
  }

  const handleMouseDown = () => {
    shootBubble(localState.angle, state)
    dispatch({ type: 'SHOOT_BUBBLE', state })
  }

  return (
    <div>
      <Game 
        handleMousePosition={handleMousePosition} 
        handleMouseDown={handleMouseDown}
        angle={localState.angle}
      />
    </div>
  )
}

export default GameContainer
