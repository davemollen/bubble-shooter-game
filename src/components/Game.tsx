import React, { useContext } from 'react'
import { GameContext } from '../contexts/GameContext'
import { Bubble, GameProps } from '../types/GameTypes'

const bubbleStyle = (bubble: Bubble): Object => {
  return ({
    backgroundColor: bubble.color,
    background: `radial-gradient(circle at 20px 20px, ${bubble.color}, rgba(0,0,0,0.7))`
  })
}

const Game: React.FC<GameProps> = ({handleMousePosition, handleMouseDown, angle}) => {
  const { state }: any = useContext(GameContext)
  const { gameTable, shootingBubble } = state

  if(gameTable === undefined){
    return <p>Loading...</p>
  }

  const bubbles = gameTable.map((row: Bubble[], rowIndex: number) => {
    const leftOffset = rowIndex % 2 ? {paddingLeft: '25px'} : {paddingLeft: '0px'}

    const rows = row.map((column: Bubble, columnIndex: number) => {
      if(column.color !== null){
        return (
          <div className='bubble' key={columnIndex} style={bubbleStyle(column)}></div>
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
      onMouseDown={() => handleMouseDown()}
      onMouseMove={(event) => handleMousePosition(event)}
    >
      <div className='gamescreen'>
        <div className='flexContainer'>{bubbles}</div>
        <div className='line'></div>
        <div className='arrow' style={{transform: `rotate(${angle}deg)`}}></div>
        <div className='bubble bubbleToShoot' style={bubbleStyle(shootingBubble)}></div>
      </div>         
    </div>
  )
}

export default Game
