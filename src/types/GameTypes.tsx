export interface Bubble {
  color: string | null
}

export interface HighScore {
  id: number,
  name: string,
  high_score: number
}

export interface Bubbles {
  gameTable: Bubble[][],
  shootingBubble: Bubble,
  hitCoordinates: number[],
  gameStatus: string
  score: number,
  countDown: number,
  clickCount: number,
  highScores: HighScore[]
}

export interface DispatchBubbles {
  type: string,
  payload: Partial<Bubbles> & {
    highScore?: HighScore
  }
}

export interface GameProps {
  handleMousePosition: Function,
  handleMouseDown: Function,
  handleTransitionEnd: Function,
  angle: number,
  shoot: boolean
}