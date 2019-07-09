import React, { createContext, useState, useEffect } from 'react'
import { GameState } from '../types/GameTypes'

export const GameContext = createContext({})

const GameContextProvider: React.FC = (props) => {
  const [state]: GameState = useState({
    gameTable: [[],[],[],[],[],[],[],[],[],[],[]],
    shootingBubble: {color: 'red'}
  })

  useEffect(() => {
    for(let column=10; column>=0; column--){

      for(let row=8; row>=0; row--){
        if(row < 3){
          const allColors = ['blue', 'red', 'purple', 'green'];
          const randomColor = allColors[Math.floor(Math.random() * 4)];
          state.gameTable[row][column] = { color: randomColor }
        } else {
          state.gameTable[row][column] = { color: null }
        }
      }

    }
  }, [state.gameTable])

  return (
    <GameContext.Provider value={ {...state} }>
      {props.children}
    </GameContext.Provider>
  )
}

export default GameContextProvider

