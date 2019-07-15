import { Bubble } from '../types/GameTypes'

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

export { bubbleStyle, shootingBubbleStyle }