import React, { useState, useContext } from 'react'
import { GameContext } from '../contexts/GameContext'
import { initializeGame } from '../actions/gameActions'
import axios, { AxiosResponse } from 'axios'

const ScoreForm: React.FC = () => {
  const { state, dispatch }: any = useContext(GameContext)
  const { score: high_score } = state
  const [name, setName] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    await axios
      .post('https://bubble-shooter-server.herokuapp.com/v1/scores',
        {name, high_score}
      )
    
    dispatch(initializeGame())
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <input 
        type='text' 
        name='name' 
        value={name} 
        placeholder='enter your name'
        autoComplete='false'
        onChange={(event) => handleChange(event)}>
      </input><br />
      <button>Submit</button>
    </form>
  )
}

export default ScoreForm
