import React, { createContext, useReducer } from 'react'
import { Bubbles } from '../types/GameTypes'
import { initializeGame } from '../actions/gameActions'

export const GameContext = createContext({})

const gameReducer = (state: Bubbles, action: {type: string, payload: any}) => {
  switch(action.type){
    case 'SHOOT_BUBBLE':
      return {...state, hitPosition: action.payload.bubbleHit}
    case 'REMOVE_BUBBLES':
      return {...action.payload.state} 
    default:
      return state
  }
}

const GameContextProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(gameReducer, initializeGame())

  return (
    <GameContext.Provider value={{state, dispatch}}>
      {props.children}
    </GameContext.Provider>
  )
}

export default GameContextProvider

