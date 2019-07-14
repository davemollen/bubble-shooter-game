import React, { useContext } from 'react'
import { GameContext } from '../contexts/GameContext'
import { Bubble, GameProps } from '../types/GameTypes'

const bubbleStyle = (bubble: Bubble): Object => {
  return ({
    backgroundColor: bubble.color,
    background: `radial-gradient(circle at 20px 20px, ${bubble.color}, rgba(0,0,0,0.7))`
  })
}

const bubbleAnimation = (shoot: boolean, hitCoordinates: number[]): Object => {
  const hexagonalCorrection = hitCoordinates[0] % 2 * 25
  const x = hitCoordinates[1] * 50 + hexagonalCorrection
  const y = 500 - hitCoordinates[0]*50

  if(shoot){
    return ({
      position: 'absolute',
      bottom: y,
      left: x,
      transition: 'all 0.5s' 
    })
  }
  return ({
    position: 'absolute',
    bottom: '0px',
    left: '250px',
    transition: 'all 0s' 
  })
}

const shootingBubbleStyle = (shoot: boolean, bubble: Bubble, hitCoordinates: number[]): Object => {
  const color = bubbleStyle(bubble)
  const position = bubbleAnimation(shoot, hitCoordinates)
  return {...color, ...position} 
}

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
