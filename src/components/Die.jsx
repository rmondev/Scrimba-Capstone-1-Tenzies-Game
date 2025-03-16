import React from 'react'

const Die = (props) => {
  return (
    <button 
      style={{backgroundColor: props.isHeld ? '#59E391' : null}}
      onClick={props.hold}
      aria-pressed={props.isHeld}
      aria-label={`Die with value of ${props.value}, is ${props.isHeld ? 'held' : 'not held'}`}
    >
        {props.value}
    </button>
  )
}

export default Die
