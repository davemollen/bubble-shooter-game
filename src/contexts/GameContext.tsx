import React, { createContext, useState, useEffect } from 'react'

export const GameContext = createContext({})

const GameContextProvider: React.FC = (props) => {
  const [state, setState] = useState({
    gameTable: [
      [{color: ''}],
      [{color: ''}],
      [{color: ''}],
      [{color: ''}],
      [{color: ''}],
      [{color: ''}],
      [{color: ''}],
      [{color: ''}],
      [{color: ''}],
    ],
    shootingBubble: {color: 'red'}
  })

  useEffect(() => {
    for(let column=8; column>=0; column--){

      for(let row=8; row>=0; row--){
        if(row < 6){
          const allColors = ['blue', 'red', 'purple', 'green'];
          const randomColor = allColors[Math.floor(Math.random() * 4)];
          state.gameTable[row][column] = { color: randomColor }
        } else {
          state.gameTable[row][column] = { color: '' }
        }
      }

    }
  }, [])

  console.log('gameTable', state.gameTable)
  return (
    <GameContext.Provider value={ {...state} }>
      {props.children}
    </GameContext.Provider>
  )
}

export default GameContextProvider

