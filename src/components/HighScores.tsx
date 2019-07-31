import React, { useContext, useEffect } from 'react'
import { GameContext } from '../contexts/GameContext'
import { HighScore } from '../types/GameTypes'
import { loadHighScores } from '../actions/gameActions'
import axios, { AxiosResponse } from 'axios'
import Loading from './Loading'

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

  if(!highScores){
    return (
      <div className='highScores'>
        <h2>High Scores</h2>
        <Loading/>
      </div>
    )
  }

  const highScoreList = highScores.map((highScore: HighScore) => {
    const {id, name, high_score} = highScore
    return (
      <li key={id}>
        <h4>{name}: {high_score}</h4>
      </li>
    )
  })

  const emptyScoreList = () => {
    const emptyScoreslength = Math.max(5 - highScores.length, 0)
    const dashesArray = new Array(emptyScoreslength).fill(`- - - - - - - - - - - - - - -`)
    return dashesArray.map((dashes, index) => {
      return (
        <li key={index-10}>
          <h4>{dashes}</h4>
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
