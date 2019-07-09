import React, { createContext, useState, useEffect, useReducer } from 'react'
import { GameState, Bubbles } from '../types/GameTypes'

export const GameContext = createContext({})

const gameReducer = (state: Bubbles, action: {type: string, payload?: Object}) => {
  switch(action.type){
    case 'initialize':
      return state
    default:
      return
  }
}

const initialState = {
  gameTable: [[],[],[],[],[],[],[],[],[],[],[]],
  shootingBubble: {color: null}
}

const GameContextProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  console.log('dispatch', dispatch)

  const randomColor = () => {
    const allColors: string[] = ['blue', 'red', 'purple', 'green'];
    return allColors[Math.floor(Math.random() * allColors.length)];
  } 

  // useEffect(() => {
  //   // initialize state on mount
  //   for(let column=10; column>=0; column--){
  //     for(let row=8; row>=0; row--){
  //       if(row < 3){
  //         state.gameTable[row][column] = { color: randomColor() }
  //       } else {
  //         state.gameTable[row][column] = { color: null }
  //       }
  //     }
  //   }
  //   state.shootingBubble.color = randomColor()
  // }, [state.gameTable, state.shootingBubble])

  return (
    <GameContext.Provider value={{state, dispatch}}>
      {props.children}
    </GameContext.Provider>
  )
}

export default GameContextProvider

