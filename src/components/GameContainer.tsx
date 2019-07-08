import React, { useState } from 'react'
import Game from './Game'

const GameContainer: React.FC = () => {
  const [state, setAngle] = useState({
    angle: 0
  })

  const handleMousePosition = (event: MouseEvent) => {
    const updateAngle: number = state.angle + (event.movementX * 0.5)
    setAngle({
      angle: updateAngle < -90 ? -90 : updateAngle > 90 ? 90 : updateAngle
    })
  }

  return (
    <div>
      <Game 
        handleMousePosition={ handleMousePosition } 
        angle={state.angle}
      />
    </div>
  )
}

export default GameContainer
