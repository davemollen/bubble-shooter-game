import { Bubble } from '../types/GameTypes'

const bubbleStyle = (bubble: Bubble): Object => {
  return ({
    backgroundColor: bubble.color,
    background: `radial-gradient(circle at 20px 20px, ${bubble.color}, rgba(0,0,0,0.7))`
  })
}

const bubbleAnimation = (shoot: boolean, hitCoordinates: number[]): Object => {
  const hexagonalCorrection: number = hitCoordinates[0] % 2 * 2
  const x: string = hitCoordinates[1] * 4 + hexagonalCorrection + 'vw'
  const y: string = 40 - hitCoordinates[0] * 4 + 'vw'

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
    bottom: '0vw',
    left: '20vw',
    transition: 'all 0s' 
  })
}

const shootingBubbleStyle = (shoot: boolean, bubble: Bubble, hitCoordinates: number[]): Object => {
  const color = bubbleStyle(bubble)
  const position = bubbleAnimation(shoot, hitCoordinates)
  return {...color, ...position} 
}

export { bubbleStyle, shootingBubbleStyle }