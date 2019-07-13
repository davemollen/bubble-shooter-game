import { Bubbles } from '../types/GameTypes'

const pickRandomColor = (): { color: string } => {
  const allColors: string[] = ['blue', 'red', 'purple', 'green']
  const randomColor =  allColors[Math.floor(Math.random() * allColors.length)]
  return { color: randomColor }
} 

export const initializeGame = (): Bubbles => {
  const state: Bubbles = {
    gameTable: [[],[],[],[],[],[],[],[],[]],
    shootingBubble: { color: null }
  }

  for(let column=10; column>=0; column--){
    for(let row=8; row>=0; row--){
      if(row < 3){
        state.gameTable[row][column] = pickRandomColor()
      } else {
        state.gameTable[row][column] = { color: null }
      }
    }
  }
  state.shootingBubble = pickRandomColor()

  return state
}

let matches: number[][] = []

export const shootBubble = (angle: number, state: Bubbles) => {
  const { gameTable } = state
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
      updateBubbles(prevRow, prevColumn, state)
      break; //if bubble gets out of the screen break from loop
    }

    // Check if it hits a ball
    const hitBubbleColor: string | null = gameTable[row][roundedColumn].color
    
    if(hitBubbleColor !== null){
      updateBubbles(prevRow, prevColumn, state)
      break;
    }
    if(row === 0 && hitBubbleColor === null){
      updateBubbles(row, roundedColumn, state)
    }

    prevRow = row
    prevColumn = roundedColumn
  }
}

const updateBubbles = (row: number, column: number, state: Bubbles) => {
  const { gameTable, shootingBubble } = state
  gameTable[row][column] = shootingBubble
  // matches = [[row, column]]
  matches = []
  removeAdjacentBubbles(row, column, state)
  state.shootingBubble = pickRandomColor()
}

const removeAdjacentBubbles = (rowHit: number, columnHit: number, state: Bubbles) => {
  const { gameTable, shootingBubble } = state
  const searchOffsets: number[][] = rowHit % 2 
    ? [
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, 0],
        [1, 1]
    ]
    : [
        [-1, -1],
        [-1, 0],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0]
    ]

  searchOffsets.forEach(offset => {
    const [offsetRow, offsetColumn] = offset
    const neighborRow = rowHit + offsetRow
    const neighborColumn = columnHit + offsetColumn
    if(neighborRow < 0 || neighborRow > 8 || neighborColumn < 0 || neighborColumn > 10){
      return;
    }

    const neighborColor = gameTable[neighborRow][neighborColumn].color
    if(neighborColor === shootingBubble.color){
      const duplicate = matches.some(match => {
        return match[0] === neighborRow && match[1] === neighborColumn
      })
      if(!duplicate){
        matches.push([neighborRow, neighborColumn])
        removeAdjacentBubbles(neighborRow, neighborColumn, state)
      }
    }
  })
  if(matches.length > 2){
    gameTable[rowHit][columnHit].color = null
    matches.forEach(match => {
      gameTable[match[0]][match[1]].color = null
    })
  }
}