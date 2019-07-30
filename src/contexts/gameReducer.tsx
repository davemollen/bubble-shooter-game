import { Bubbles, DispatchBubbles } from '../types/GameTypes'

const gameReducer = (state: Bubbles, action: DispatchBubbles): any => {
  const { 
    gameTable,
    shootingBubble, 
    hitCoordinates, 
    score,
    gameStatus,  
    countDown, 
    clickCount, 
    highScores
  } = action.payload

  switch(action.type){
    case 'INITIALIZE':
      return {...state, ...action.payload}
    case 'GAME_STATUS':
      return {...state, gameStatus}
    case 'SHOOT_BUBBLE':
      return {...state, hitCoordinates, clickCount}
    case 'REMOVE_BUBBLES':
      return {...state, gameTable, shootingBubble, score} 
    case 'ADD_NEW_BUBBLEROW':
      return {...state, gameTable}
    case 'COUNTDOWN':
      return {...state, countDown}
    case 'LOAD_HIGH_SCORES':
      return {...state, highScores}
    default:
      return state
  }
}

export default gameReducer