import React, { createContext, useReducer, useEffect } from 'react'
import gameReducer from './gameReducer'
import { initializeGame } from '../actions/gameActions'

export const GameContext = createContext({})

const GameContextProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(gameReducer, {})

  useEffect(() => {
    dispatch(initializeGame())
  },[])

  return (
    <GameContext.Provider value={{state, dispatch}}>
      {props.children}
    </GameContext.Provider>
  )
}

export default GameContextProvider

