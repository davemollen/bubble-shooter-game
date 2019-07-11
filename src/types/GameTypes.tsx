export interface Bubble {
  color: string | null
}

export interface Bubbles {
  gameTable: Bubble[][],
  shootingBubble: Bubble
}

export interface GameState extends Array<Bubbles|Function>{}