import './Exercises.css'
import exercises from './exercises.json'
import { useEffect, useState } from 'react'
import { Timer } from './Timer'

export function Exercise({ deck, cardIndex, numValue, isTimed, isTimerComplete, setIsTimerComplete }) {
    

const [timeValue, setTimeValue] = useState(0)

useEffect(() => {
    setTimeValue(numValue * 5)
}, [numValue])


      return (       
        <>
        <h5 key={cardIndex}>{isTimed ? timeValue + ' sec' : numValue} </h5>
        <h5>{deck[cardIndex].exercise}</h5>
        {isTimed && <Timer duration={numValue * 5000} isTimerComplete={isTimerComplete} setIsTimerComplete={setIsTimerComplete}/>} 
        </>
      )
}
