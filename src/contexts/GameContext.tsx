import React, { createContext, useState, useEffect } from 'react'
import { GameState } from '../types/GameTypes'

export const GameContext = createContext({})

const GameContextProvider: React.FC = (props) => {
  const [state]: GameState = useState({
    gameTable: [[],[],[],[],[],[],[],[],[],[],[]],
    shootingBubble: { color: 'red' }
  })

  const randomColor = () => {
    const allColors: string[] = ['blue', 'red', 'purple', 'green'];
    return allColors[Math.floor(Math.random() * allColors.length)];
  } 

  useEffect(() => {
    // initialize state on mount
    for(let column=10; column>=0; column--){
      for(let row=8; row>=0; row--){
        if(row < 3){
          state.gameTable[row][column] = { color: randomColor() }
        } else {
          state.gameTable[row][column] = { color: null }
        }
      }
    }
    state.shootingBubble.color = randomColor()
  }, [state.gameTable, state.shootingBubble])

  return (
    <GameContext.Provider value={ {...state} }>
      {props.children}
    </GameContext.Provider>
  )
}

export default GameContextProvider

