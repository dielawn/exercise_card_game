import { useEffect, useState } from 'react';
import './App.css'
import { CardDeck } from './Cards';
import { Exercise } from './Exercise';

function App() {
  const [exerciseArray, setExerciseArray] = useState([])
  
  

  return (
    <>
    
    <CardDeck exerciseArray={exerciseArray} setExerciseArray={setExerciseArray} />
    
    </>
  )
}

export default App
