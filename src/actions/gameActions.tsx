import { Bubbles, Bubble, DispatchBubbles } from '../types/GameTypes'

const pickRandomColor = (): { color: string } => {
  const allColors: string[] = ['blue', 'red', 'purple', 'green']
  const randomColor: string =  allColors[Math.floor(Math.random() * allColors.length)]
  return { color: randomColor }
} 

export const initializeGame = (): DispatchBubbles => {
  const state: Bubbles = {
    gameTable: [[],[],[],[],[],[],[],[],[]],
    shootingBubble: { color: null },
    hitCoordinates: [],
    gameStatus: 'inactive',
    score: 0,
    countDown: 120,
    clickCount: 0
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

  return {
    type: 'INITIALIZE',
    payload: {
      ...state  
    }
  }
}

export const shootBubble = (angle: number, state: Bubbles): DispatchBubbles => {
  const { gameTable, clickCount } = state
  let prevRow: number = 0
  let prevColumn: number = 0

  const radians: number = angle * (Math.PI / 180)
  const columnStepSize: number = Math.sin(radians) / Math.cos(radians)
  let currentColumn: number = 5.5 + columnStepSize
  const startingRow: number = 8

  let hitCoordinates: number[] = []
  // Go through the rows and go a column to the left or right
  for(let row: number = startingRow; row>=0; row--){
    const hexagonalCorrection: number = row % 2 * -0.5
    currentColumn += columnStepSize
    const roundedColumn: number = Math.floor(currentColumn + hexagonalCorrection)

    if(roundedColumn < 0 || roundedColumn > 10){
      hitCoordinates = [prevRow, prevColumn]
      break
    }

    // Check if it hits a ball
    const hitBubbleColor: string | null = gameTable[row][roundedColumn].color
    
    if(hitBubbleColor !== null){
      hitCoordinates = [prevRow, prevColumn]
      break
    }
    if(row === 0 && hitBubbleColor === null){
      hitCoordinates = [row, roundedColumn]
    }

    prevRow = row
    prevColumn = roundedColumn
  }
  
  return {
    type: 'SHOOT_BUBBLE',
    payload: {
      hitCoordinates,
      clickCount: clickCount + 1
    }
  }
}

const copyGameTable = (gameTable: Bubble[][]): Bubble[][] => {
  return gameTable.map(column => column.map(row => row))
}

export const removeBubbles = (state: Bubbles, dispatch: Function): void => {
  const { gameTable, shootingBubble, hitCoordinates, score, clickCount } = state
  const [row, column] = hitCoordinates
  const gameTableCopy = copyGameTable(gameTable)

  gameTableCopy[row][column] = shootingBubble
  let matches: number[][] = []
  const removedBubbleCount: number = removeAdjacentBubbles({...state, gameTable: gameTableCopy}, matches) 
  const updatedScore: number = removedBubbleCount * removedBubbleCount + score

  dispatch({
    type: 'REMOVE_BUBBLES',
    payload: {
      gameTable: gameTableCopy,
      shootingBubble: pickRandomColor(),
      score: updatedScore
    }
  })

  if(clickCount % 9 === 0 && clickCount !== 0){
    dispatch(addNewRowOfBubbles(gameTableCopy))
  }

  dispatch(checkForGameOver(gameTableCopy))
}

const removeAdjacentBubbles = (state: Bubbles, matches: number[][]): number => {
  const { gameTable, hitCoordinates } = state
  const [row, column] = hitCoordinates
  const searchOffsets: number[][] = row % 2 
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
    const adjacentRow = row + offsetRow
    const adjacentColumn = column + offsetColumn
    if(breakFromSearchOffset(state, matches, adjacentRow, adjacentColumn)){
      return
    }

    matches.push([adjacentRow, adjacentColumn])
    removeAdjacentBubbles({...state, hitCoordinates: [adjacentRow, adjacentColumn]}, matches)
  })

  if(matches.length > 2){
    gameTable[row][column].color = null
    matches.forEach(match => {
      gameTable[match[0]][match[1]].color = null
    })
    return matches.length
  }
  return 0
}

const breakFromSearchOffset = (state: Bubbles, matches: number[][], adjacentRow: number, adjacentColumn: number): boolean => {
  if(adjacentRow < 0 || adjacentRow > 8 || adjacentColumn < 0 || adjacentColumn > 10){
    return true
  }
  
  const adjacentBubble: Bubble = state.gameTable[adjacentRow][adjacentColumn]
  if(adjacentBubble.color !== state.shootingBubble.color 
    || adjacentBubble.color === null){
    return true
  }
  
  const alreadyChecked: boolean = matches.some(match => {
    return match[0] === adjacentRow && match[1] === adjacentColumn
  })
  if(alreadyChecked){
    return true
  }
  
  return false
}

const addNewRowOfBubbles = (gameTable: Bubble[][]): DispatchBubbles => {
  let newRow: Bubble[] = []
  for(let column=10; column>=0; column--){
    newRow.push(pickRandomColor())
  }

  const removeRowFromGameTable = gameTable.slice(0, 8)
  const addRowToGameTable = [newRow,...removeRowFromGameTable]
  
  return {
    type: 'ADD_NEW_BUBBLEROW',
    payload: {
      gameTable: addRowToGameTable,
    }
  }
}

const checkForGameOver = (gameTable: Bubble[][]): DispatchBubbles => {
  const gameOver: boolean = gameTable[8].some(row => row.color !== null)
  
  if(gameOver){
    return {
      type: 'GAME_STATUS',
      payload: {
        gameStatus: 'gameover',
      }
    }
  } else {
    return {
      type: 'GAME_STATUS',
      payload: {
        gameStatus: 'active',
      }
    }
  }
}

export const setGameStatus = (gameStatus: string): DispatchBubbles => {
  return {
    type: 'GAME_STATUS',
    payload: {
      gameStatus: gameStatus
    }
  }
}

export const setCountDown = (countDown: number): DispatchBubbles => {
  return {
    type: 'COUNTDOWN',
    payload: {
      countDown: countDown - 1
    }
  }
}