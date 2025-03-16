import { useState, useEffect} from 'react'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
import Die from '../src/components/Die'

function App() {

const [windowDimension, setWindowDimension] = useState({width: window.innerWidth, height: window.innerHeight})

useEffect(()=>{

  console.log('Effect Triggered!')
  window.addEventListener("resize", ()=>{
    setWindowDimension({
      width: window.innerWidth, 
      height: window.innerHeight})
  })
}, [])


  const generateAllNewDice = () => {
    return new Array(10)
      .fill(0)
      .map(()=> ({
        value: Math.ceil(Math.random()*6), 
        isHeld: false,
        id: nanoid()}))
  }

  const rollDice = () => {

    gameWon ? setDice(generateAllNewDice()) : setDice(prevDice => prevDice.map(item=> { return item.isHeld ? item : {...item, value: Math.ceil(Math.random()*6)}}))

    // if (gameWon) {
    
    //   setDice(generateAllNewDice())
    // } else {
    //   setDice(prevDice => prevDice.map(item=> {
    //     return item.isHeld ? item : {...item, value: Math.ceil(Math.random()*6)}
    // }))
    // }
  }


  const hold = (id) => {
    setDice(prevDice => prevDice.map(item=> {
      return item.id === id ? {...item, isHeld: !item.isHeld} : item
    }))
  }




  const [dice, setDice] = useState(() => generateAllNewDice())
 
 

   // Winning Condition (check every die 'isHeld' value in the array for truthiness, and check if all values of the die are the same)
  let gameWon = dice.every(die => die.isHeld) && dice.every(die=> die.value === dice[0].value)


  //Window Game-One


  const diceElements = dice.map(dieObject => (
    <Die 
      key={dieObject.id} 
      id={dieObject.id} 
      value={dieObject.value} 
      isHeld={dieObject.isHeld} 
      // hold={() => hold(dieObject.id)}
      hold={ ()=>hold(dieObject.id) }
      
      />
    ))
    
  

  return (
  
    <main>
      {gameWon && <Confetti gravity={0.05} numberOfPieces={300}width={windowDimension.width} height={windowDimension.height}/>}
      <div aria-live='polite' className='sr-only'>
        {gameWon && <p>Congratulations! You win! Press "New Game" to play again.</p>}
      </div>
       <h1 className="title">Tenzies</h1>
       <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button className='roll-dice' onClick={rollDice}>
        {gameWon ? 'New Game' : 'Roll'}
        </button>
    </main>

  
  )
}

export default App
