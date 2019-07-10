import { Bubbles } from '../types/GameTypes'

const randomColor = () => {
  const allColors: string[] = ['blue', 'red', 'purple', 'green'];
  return allColors[Math.floor(Math.random() * allColors.length)];
} 

export function initializeGame(){
  const state: Bubbles = {
    gameTable: [[],[],[],[],[],[],[],[],[]],
    shootingBubble: { color: null }
  }

  for(let column=10; column>=0; column--){
    for(let row=8; row>=0; row--){
      if(row < 3){
        state.gameTable[row][column] = { color: randomColor() }
      } else {
        state.gameTable[row][column] = { color: null }
      }
    }
  }
  state.shootingBubble.color = randomColor()

  return state
}