import { Bubble, Bubbles } from '../types/GameTypes'

const randomColor = (): string => {
  const allColors: string[] = ['blue', 'red', 'purple', 'green']
  return allColors[Math.floor(Math.random() * allColors.length)]
} 

export const initializeGame = (): Bubbles => {
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

const searchOffsets: number[][] = [
  [0, -1],
  [-1, -1],
  [-1, 0],
  [0, 1],
  [1, 0],
  [1, -1]
]
let matches: number[][] = []

export const shootBubble = (angle: number, shotBubbleColor: string, bubbles: Bubble[][]) => {
  let prevRow: number = 0
  let prevColumn: number = 0

  const radians: number = angle * (Math.PI / 180)
  const columnStepSize: number = Math.sin(radians) / Math.cos(radians)
  let currentColumn: number = 5.5 + columnStepSize
  const startingRow: number = 8

  // Go through the rows and go a column to the left or right
  for(let row: number = startingRow; row>=0; row--){
    const hexagonalCorrection: number = row % 2 * -0.5
    currentColumn += columnStepSize
    const roundedColumn: number = Math.floor(currentColumn + hexagonalCorrection)

    if(roundedColumn < 0 || roundedColumn > 10){
      removeNeighbors(shotBubbleColor, prevRow, prevColumn, bubbles)
      break; //if bubble gets out of the screen break from loop
    }

    // Check if it hits a ball
    const hitBubbleColor: string | null = bubbles[row][roundedColumn].color
    
    if(hitBubbleColor !== null){
      removeNeighbors(shotBubbleColor, prevRow, prevColumn, bubbles)
      break;
    }
    if(row === 0 && hitBubbleColor === null){
      removeNeighbors(shotBubbleColor, row, roundedColumn, bubbles)
    }

    prevRow = row
    prevColumn = roundedColumn
  }
}

const removeNeighbors = (shotBubbleColor: string, row: number, column: number, bubbles: Bubble[][]) => {
  bubbles[row][column].color = shotBubbleColor
  compareNeighbors(shotBubbleColor, row, column, bubbles)
  matches.length = 0
}

const compareNeighbors = (shotColor: string, rowHit: number, columnHit: number, bubbles: Bubble[][]) => {
  searchOffsets.forEach(offset => {
    const [offsetRow, offsetColumn] = offset
    const neighborRow = rowHit + offsetRow
    const neighborColumn = columnHit + offsetColumn
    if(neighborRow < 0 || neighborRow > 8 || neighborColumn < 0 || neighborColumn > 10){
      return;
    }

    const neighborColor = bubbles[neighborRow][neighborColumn].color
    if(neighborColor === shotColor){
      const duplicate = matches.some(match => {
        return match[0] === neighborRow && match[1] === neighborColumn
      })
      if(!duplicate){
        matches.push([neighborRow, neighborColumn])
        compareNeighbors(shotColor, neighborRow, neighborColumn, bubbles)
      }
    }
  })
  if(matches.length > 1){
    bubbles[rowHit][columnHit].color = null
    matches.forEach(match => {
      bubbles[match[0]][match[1]].color = null
    })
  }
}