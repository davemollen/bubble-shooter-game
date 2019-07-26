import React, { createContext, useReducer, useEffect } from 'react'
import { Bubbles } from '../types/GameTypes'
import { initializeGame } from '../actions/gameActions'

export const GameContext = createContext({})

const gameReducer = (state: Bubbles, action: {type: string, payload: any}) => {
  const { 
    gameTable,
    shootingBubble, 
    hitCoordinates, 
    score,
    gameStatus,  
    countDown, 
    clickCount
  } = action.payload

  switch(action.type){
    case 'INITIALIZE':
      return action.payload
    case 'GAME_STATUS':
      return {...state, gameStatus}
    case 'SHOOT_BUBBLE':
      return {...state, hitCoordinates, clickCount}
    case 'REMOVE_BUBBLES':
      return {...state, gameTable, shootingBubble, score} 
    case 'ADD_NEW_BUBBLEROW':
      return {...state, gameTable}
    case 'COUNTDOWN':
      return {...state, countDown}
    default:
      return state
  }
}

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

