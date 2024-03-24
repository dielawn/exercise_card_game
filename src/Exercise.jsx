import './Exercises.css'
import exercises from './exercises.json'
import { useEffect, useMemo, useState } from 'react'
import { Timer } from './Timer'

export function Exercise({ exerciseArray, cardIndex, isJoker, numValue, isTimed }) {
    
console.log(isTimed)

      return (
        <>
        {isJoker? 
             <h5  key={cardIndex}>{numValue} {exercises[0].exercise}</h5>
        :
        <>
        <h5 key={cardIndex}>{numValue} {exerciseArray[cardIndex]}</h5>
        {/* {isTimed && <Timer duration={numValue} />}  */}
        </>}
        </>
      )
}
