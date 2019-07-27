import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'

interface Score {
  id: number,
  name: string,
  high_score: number
}

const HighScores: React.FC = () => {
  const [highScores, setHighScores] = useState<Score[]>([])

  useEffect(() =>{
    getHighScores()
  }, [])

  const getHighScores = async (): Promise<void> => {
    const response: AxiosResponse = 
      await axios.get('https://bubble-shooter-server.herokuapp.com/v1/scores')
    setHighScores(response.data)
  }

  if(highScores.length === 0){
    return <></>
  }

  const highScoreList = highScores.map((highScore: Score) => {
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
