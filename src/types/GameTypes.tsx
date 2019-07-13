export interface Bubble {
  color: string | null
}

export interface Bubbles {
  gameTable: Bubble[][],
  shootingBubble: Bubble
}

export type GameProps = {
  handleMousePosition: Function,
  handleMouseDown: Function,
  angle: number
}

// export interface GameState extends Array<Bubbles|Function>{}