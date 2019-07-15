import React, { useContext } from 'react'
import { GameContext } from '../contexts/GameContext'
import { Bubble, GameProps } from '../types/GameTypes'
import { bubbleStyle, shootingBubbleStyle } from './BubbleStyles'

const Game: React.FC<GameProps> = ({handleMousePosition, handleMouseDown, handleTransitionEnd, angle, shoot}) => {
  const { state }: any = useContext(GameContext)
  const { gameTable, shootingBubble, hitCoordinates } = state

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
        <div
          className={'bubble'}
          onTransitionEnd={() => handleTransitionEnd()} 
          style={shootingBubbleStyle(shoot, shootingBubble, hitCoordinates)}
        >
        </div>
      </div>         
    </div>
  )
}

export default Game
