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
          // await axios.get('https://bubble-shooter-server.herokuapp.com/v1/scores')
          await axios.get('http://localhost:4000/v1/scores')
        dispatch(loadHighScores(response.data))
      } catch(error){
        console.error(error)
      }
    }
    fetchHighScores()
  }, [dispatch])

  if(!highScores){
    return <></>
  }

  const highScoreList = highScores.map((highScore: HighScore) => {
    const {id, name, high_score} = highScore
    return (
      <li key={id}>
        <h4>{name}: {high_score}</h4>
      </li>
    )
  })

  return (
    <div className='highScores'>
      <h2>High Scores</h2>
      <ul>
        {highScoreList}
      </ul>
    </div>
  )
}

export default HighScores
