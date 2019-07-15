import React, { useState, useContext } from 'react'
import Game from './Game'
import { GameContext } from '../contexts/GameContext'
import { shootBubble, removeBubbles } from '../actions/gameActions'

const GameContainer: React.FC = () => {
  const { state, dispatch }: any = useContext(GameContext)

  const [localState, setLocalState] = useState({
    angle: 0,
    shoot: false
  })

  const handleMousePosition = (event: MouseEvent) => {
    const updateAngle: number = localState.angle + (event.movementX * 0.5)
    setLocalState({
      ...localState,
      angle: updateAngle < -70 ? -70 : updateAngle > 70 ? 70 : updateAngle
    })
  }

  const handleMouseDown = () => {
    if(localState.shoot) return
    dispatch(shootBubble(localState.angle, state))
    setLocalState({
      ...localState,
      shoot: true
    })
  }

  const handleTransitionEnd = () => {
    if(localState.shoot){
      setLocalState({
        ...localState,
        shoot: false
      })
      dispatch(removeBubbles(state))
    }
  }

  return (
    <div>
      <Game 
        handleMousePosition={handleMousePosition} 
        handleMouseDown={handleMouseDown}
        handleTransitionEnd={handleTransitionEnd}
        angle={localState.angle}
        shoot={localState.shoot}
      />
    </div>
  )
}

export default GameContainer
