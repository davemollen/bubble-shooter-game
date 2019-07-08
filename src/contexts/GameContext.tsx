import React, { createContext, useState } from 'react'

export const GameContext = createContext({})

const GameContextProvider: React.FC = (props) => {
  const [state] = useState({
    gameTable: [
      [
        {color: 'blue'}, 
        {color: 'red'}, 
        {color: 'purple'}, 
        {color: 'green'}, 
        {color: 'purple'}, 
        {color: 'green'}, 
        {color: 'red'}, 
        {color: 'purple'}, 
        {color: 'green'}, 
        {color: 'red'}, 
        {color: 'green'}
      ],
      [
        {color: 'blue'}, 
        {color: 'red'}, 
        {color: 'purple'}, 
        {color: 'green'}, 
        {color: 'purple'}, 
        {color: 'green'}, 
        {color: 'red'}, 
        {color: 'purple'}, 
        {color: 'green'}, 
        {color: 'red'}, 
        {color: 'green'}
      ],
      [
        {color: null}, 
        {color: null}, 
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null}, 
        {color: null}
      ],
      [
        {color: null}, 
        {color: null}, 
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null}, 
        {color: null}
      ],
      [
        {color: null}, 
        {color: null}, 
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null}, 
        {color: null}
      ],[
        {color: null}, 
        {color: null}, 
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null}, 
        {color: null}
      ],
      [
        {color: null}, 
        {color: null}, 
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null}, 
        {color: null}
      ],
      [
        {color: null}, 
        {color: null}, 
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null}, 
        {color: null}
      ],
      [
        {color: null}, 
        {color: null}, 
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null},  
        {color: null}, 
        {color: null}, 
        {color: null}
      ]
    ],
    shootingBubble: {color: 'red'}
  })

  return (
    <GameContext.Provider value={ {...state} }>
      {props.children}
    </GameContext.Provider>
  )
}

export default GameContextProvider

