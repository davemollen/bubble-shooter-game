import React from 'react'
import { BeatLoader } from 'react-spinners';

const Loading: React.FC = () => {
  return (
    <BeatLoader
      size={10}
      margin={'2px'}
      loading={true}
    />
  )
}

export default Loading
