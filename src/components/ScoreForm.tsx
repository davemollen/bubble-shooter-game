import React, { useState, useContext } from 'react'
import { GameContext } from '../contexts/GameContext'
import { initializeGame } from '../actions/gameActions'

const ScoreForm: React.FC = () => {
  const { dispatch }: any = useContext(GameContext)
  const [name, setName] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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
