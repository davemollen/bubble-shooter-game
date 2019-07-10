import React, { createContext, useReducer } from 'react'
import { Bubbles } from '../types/GameTypes'
import { initializeGame } from '../actions/gameActions'

export const GameContext = createContext({})

const gameReducer = (state: Bubbles, action: {type: string, payload: any}) => {
  switch(action.type){
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

