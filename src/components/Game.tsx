import React, { useContext } from 'react'
import { GameContext } from '../contexts/GameContext'
import { Bubble } from '../types/GameTypes'

type GameProps = {
  handleMousePosition: Function,
  angle: number
}

const Game: React.FC<GameProps> = ({handleMousePosition, angle}) => {
  const { state }: any = useContext(GameContext)
  const { gameTable, shootingBubble } = state

  if(gameTable === undefined){
    return <p>Loading...</p>
  }
  const bubbles = gameTable.map((row: any[], rowIndex: number) => {

    const leftOffset = rowIndex % 2 ? {paddingLeft: '25px'} : {paddingLeft: '0px'}
    
    const rows = row.map((element: Bubble, columnIndex: number) => {
      if(element.color !== null){
        return (
          <div 
            className='bubble'
            key={columnIndex}
            style={
              {
                backgroundColor: element.color,
                background: 
                `radial-gradient(circle at 20px 20px, ${element.color}, rgba(0,0,0,0.7))`,
              }
            }
          >
          </div>
        )
      } 
      else {
        return (
          <div className='bubble' key={columnIndex}></div>
        )
      }
    })
    return <div key={rowIndex} className='flexContainer' style={leftOffset}>{rows}</div>
  })

  return (
    <div className='fullscreen' 
      // onMouseDown={(event) => handleMouseDown(event)}
      onMouseMove={(event) => handleMousePosition(event)}
    >
      <div className='gamescreen'>
        <div className='flexContainer'>{bubbles}</div>
        <div className='line'></div>
        <div className='arrow' style={{transform: `rotate(${angle}deg)`}}></div>

        <div className='bubble bubbleToShoot' 
          style={
            {
              backgroundColor: shootingBubble.color,
              background: 
              `radial-gradient(circle at 20px 20px, ${shootingBubble.color}, rgba(0,0,0,0.7))`
            }
          }
        >
        </div>
      </div>         
    </div>
  )
}

export default Game
