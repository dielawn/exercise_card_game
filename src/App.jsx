import { useEffect, useState } from 'react';
import './App.css'
import { CardDeck } from './Cards';
import { Exercise } from './Exercise';
import { FilterSelect } from './Filter';

function App() {
  const [exerciseArray, setExerciseArray] = useState([])
  
  

  return (
    <>
    {/* <FilterSelect exerciseArray={exerciseArray} setExerciseArray={setExerciseArray} /> */}
    <CardDeck exerciseArray={exerciseArray} setExerciseArray={setExerciseArray} />
    
    </>
  )
}

export default App
