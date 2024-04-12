import { useEffect, useState } from 'react';
import './App.css'
import { CardDeck } from './Cards';
import { Exercise } from './Exercise';
import { FilterSelect } from './Filter';

function App() {

  
  return (
    <>
    {/* <FilterSelect exerciseArray={exerciseArray} setExerciseArray={setExerciseArray} /> */}
    <CardDeck />
    
    </>
  )
}

export default App
