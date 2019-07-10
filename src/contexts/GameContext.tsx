import React, { createContext, useEffect, useReducer } from 'react'
import { Bubbles } from '../types/GameTypes'
import { initializeGame } from '../actions/gameActions'

export const GameContext = createContext({})

const emptyState = {
  gameTable: [[],[],[],[],[],[],[],[],[]],
  shootingBubble: {color: null}
}

const gameReducer = (state: Bubbles, action: {type: string, payload: Bubbles}) => {
  switch(action.type){
    default:
      return state
  }
}

const GameContextProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(gameReducer, emptyState)

  useEffect(() => {
    initializeGame(state)
  }, [state])

  return (
    <GameContext.Provider value={{state, dispatch}}>
      {props.children}
    </GameContext.Provider>
  )
}

export default GameContextProvider

