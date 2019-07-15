export interface Bubble {
  color: string | null
}

export interface Bubbles {
  gameTable: Bubble[][],
  shootingBubble: Bubble,
  hitCoordinates: number[]
}

export type GameProps = {
  handleMousePosition: Function,
  handleMouseDown: Function,
  handleTransitionEnd: Function,
  angle: number,
  shoot: boolean
}

// export interface GameState extends Array<Bubbles|Function>{}