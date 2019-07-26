export interface Bubble {
  color: string | null
}

export interface Bubbles {
  gameTable: Bubble[][],
  shootingBubble: Bubble,
  hitCoordinates: number[],
  gameStatus: string
  score: number,
  countDown: number,
  clickCount: number
}

export interface DispatchBubbles {
  type: string,
  payload: {
    gameTable?: Bubble[][],
    shootingBubble?: Bubble,
    hitCoordinates?: number[],
    gameStatus?: string
    score?: number
    countDown?: number
    clickCount?: number
  }
}

export interface GameProps {
  handleMousePosition: Function,
  handleMouseDown: Function,
  handleTransitionEnd: Function,
  angle: number,
  shoot: boolean
}