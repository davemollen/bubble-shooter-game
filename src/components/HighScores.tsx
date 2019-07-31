import React, { useContext, useEffect } from 'react'
import { GameContext } from '../contexts/GameContext'
import { HighScore } from '../types/GameTypes'
import { loadHighScores } from '../actions/gameActions'
import axios, { AxiosResponse } from 'axios'

const HighScores: React.FC = () => {
  const { state, dispatch }: any = useContext(GameContext)
  const { highScores } = state

  useEffect(() => {
    const fetchHighScores = async (): Promise<void> => {
      try {
        const response: AxiosResponse =
          await axios.get('https://bubble-shooter-server.herokuapp.com/v1/scores')
        dispatch(loadHighScores(response.data))
      } catch(error){
        console.error(error)
      }
    }
    fetchHighScores()
  }, [dispatch])

  const highScoreList = highScores && highScores.map((highScore: HighScore) => {
    const {id, name, high_score} = highScore
    return (
      <li key={id}>
        <h4>{name}: {high_score}</h4>
      </li>
    )
  })

  const emptyScoreList = () => {
    const highScoresLength = highScores ? highScores.length : 0
    const emptyScoreslength = Math.max(5 - highScoresLength, 0)
    const values = new Array(emptyScoreslength).fill(`- - - - - - - - - - - - - - -`)
    return values.map((value, index) => {
      return (
        <li key={index-10}>
          <h4>{value}</h4>
        </li>
      )
    })
  }

  return (
    <div className='highScores'>
      <h2>High Scores</h2>
      <ul>
        {highScoreList}
        {emptyScoreList()}
      </ul>
    </div>
  )
}

export default HighScores
