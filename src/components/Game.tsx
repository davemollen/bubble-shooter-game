import React, { useContext } from 'react'
import { GameContext } from '../contexts/GameContext'
import { Bubble, GameProps } from '../types/GameTypes'

const bubbleStyle = (bubble: Bubble): Object => {
  return ({
    backgroundColor: bubble.color,
    background: `radial-gradient(circle at 20px 20px, ${bubble.color}, rgba(0,0,0,0.7))`
  })
}

const bubbleAnimation = (shoot: boolean, hitPosition: number[]): Object => {
  const x = hitPosition[1] * 50 + (hitPosition[0] % 2 * 25)
  const y = 500 - hitPosition[0]*50

  if(shoot){
    return ({
      bottom: y,
      left: x,
      transition: 'all 0.5s' 
    })
  }
  return ({
    bottom: '0px',
    left: '250px',
    transition: 'all 0s' 
  })
}

const shootingBubbleStyle = (shoot: boolean, bubble: Bubble, hitPosition: number[]): Object => {
  const color = bubbleStyle(bubble)
  const position = bubbleAnimation(shoot, hitPosition)
  return {...color, ...position} 
}

const Game: React.FC<GameProps> = ({handleMousePosition, handleMouseDown, handleTransitionEnd, angle, shoot}) => {
  const { state }: any = useContext(GameContext)
  const { gameTable, shootingBubble, hitPosition } = state

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
          className={'bubbleToShoot'}
          onTransitionEnd={() => handleTransitionEnd()} 
          style={shootingBubbleStyle(shoot, shootingBubble, hitPosition)}
        >
        </div>
      </div>         
    </div>
  )
}

export default Game
