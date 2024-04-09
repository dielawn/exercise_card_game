import './Cards.css';
import { Exercise } from './Exercise';
import { useState, useEffect } from "react";
import exercises from './exercises.json';
import { Timer } from './Timer';

export function CardDeck({exerciseArray, setExerciseArray}) {
    const [deck, setDeck] = useState([]);
    const [visibleCardIndex, setVisibleCardIndex] = useState(null);
    const [isTimerComplete, setIsTimerComplete] = useState(true)
    const [stats, setStats] = useState([]);
    const [isGameOver, setIsGameOver] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    const startMsg = `Click Cards to advance.`
  
    const suits = ['spades', 'diamonds', 'clubs', 'hearts'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const jokers = [{ value: 'Joker', suit: 'red', numberValue: 20 }, { value: 'Joker', suit: 'black', numberValue: 20 }];
  
    function newDeck() {
        //create deck
        const cards = suits.flatMap(suit =>
            values.map((value) => {
                //number value for each card
                let numberValue;
                if (['J', 'Q', 'K', 'A'].includes(value)) {
                    numberValue = ['J', 'Q', 'K', 'A'].indexOf(value) + 11; //assigning 11, 12, 13, 14 to J, Q, K, A
                } else {
                    console.log(value, numberValue)
                    if (value === 0) {
                      numberValue = 20; //parsing the number for numerical cards
                    } else {
                      numberValue = parseInt(value);
                    }                   
                }
                return { value, suit, numberValue };
            })
        ).concat(jokers);

      //shuffle deck
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
        }
      setDeck(cards);
    }

    function flipCard(cardIndex) {
        if (visibleCardIndex === cardIndex) {
            setVisibleCardIndex(null); //hide the card if it's already visible
        } else {
            setVisibleCardIndex(cardIndex); //show the clicked card
        }
    }

    function gameStats() {
     const statsObj = {}

     deck.forEach((card, index) => {
      const exerciseInfo = exerciseArray[index]
      const {randomExercise, repType} = exerciseInfo

      //if exercise is not in obj initialize it
      if (!statsObj[randomExercise]) {
        statsObj[randomExercise] = { totalQty: 0, isTimed: repType === 'time' };
      }

      //accumulate qty based on card value
      const qtyToAdd = card.numberValue
      statsObj[randomExercise].totalQty += qtyToAdd
     });

     
    
     //convert statsObj to an array
     const statsArray = Object.keys(statsObj).map(key => ({
      exercise: key,
      totalQty: statsObj[key].totalQty,
      isTimed: statsObj[key].isTimed
     }));
     statsArray.map(item => {
      console.log(item)
     })
     setStats(statsArray)
    }
    
    function playRound(cardIndex) {
        let newIndex = cardIndex + 1
        setCurrentIndex(newIndex);
        setVisibleCardIndex(newIndex);        
    }

    function newGame() {
        setCurrentIndex(0)
        setIsGameOver(false)
        newDeck()
        setIsTimerComplete(false)
    }
   
      useEffect(() =>  {
        if (currentIndex >= deck.length) {
            setIsGameOver(true)
            gameStats()
            setCurrentIndex(0)
        }
        console.log(currentIndex, deck.length)
      }, [currentIndex])

      useEffect(() => {
        flipCard(0)
      }, [deck])
   
      useEffect(() => {
        function generateExerciseArray() {
            let tempArray = []
            while (tempArray.length < 55) {
                const randomIndex = Math.floor(Math.random() * exercises.length);
                const randomExercise = exercises[randomIndex].exercise;        
                const repType = exercises[randomIndex].duration
                tempArray.push({randomExercise, repType})
            }
            return tempArray
        }
        newDeck()
        let tempArray = generateExerciseArray()
        setExerciseArray(tempArray)
      }, [])

      return (
        <div className="deckDiv">
          
          {/* <Timer duration={card.value}  isTimerComplete={isTimerComplete} setIsTimerComplete={setIsTimerComplete}/> */}
          {isGameOver && 
            <>
              <div className='statsDiv'>
                <h3>{stats.length} Exercises completed!</h3>
              {stats.map((stat, index) => (<p key={index} className='statsList'> {stat.exercise} {stat.isTimed ? `${stat.totalQty * 5} sec` : `${stat.totalQty} reps`}</p>))}
              </div>
              <button className='newGameBtn' onClick={newGame}><span className='startBtnTxt'>Start Game <br></br><br></br>{startMsg}</span><span className='cardBack'>🂠</span></button>
            </>}
          {!isGameOver && deck.map((card, index) => visibleCardIndex === index && (
              <>            
              <h3>Current card: {currentIndex + 1} of {deck.length}</h3>  
              <button 
                key={index} 
                onClick={() => playRound(index)} 
                className={card.suit === 'hearts' || card.suit === 'diamonds' || card.suit === 'red'
                    ? 'red-suit cardBtn' : 'black-suit cardBtn'}>
                    {card.suit === 'hearts' && <span className='topValue'>{card.value}♥️</span>}
                    {card.suit === 'diamonds' && <span className='topValue'>{card.value}♦️</span>}
                    {card.suit === 'clubs' && <span className='topValue'>{card.value}♣️</span>}
                    {card.suit === 'spades' && <span className='topValue'>{card.value}♠️</span>}

                    {card.suit === 'hearts' && <span className='btmValue'>{card.value}♥️</span>}
                    {card.suit === 'diamonds' && <span className='btmValue'>{card.value}♦️</span>}
                    {card.suit === 'clubs' && <span className='btmValue'>{card.value}♣️</span>}
                    {card.suit === 'spades' && <span className='btmValue'>{card.value}♠️</span>}
                    {card.value === 'Joker' && <span>{card.value}<br></br><span className='jokerImg'>🃏</span></span>}
                    <Exercise 
                        cardIndex={currentIndex} 
                        isJoker={card.value === "Joker"} 
                        exerciseArray={exerciseArray} 
                        setExerciseArray={setExerciseArray} 
                        numValue={card.numberValue} 
                        isTimed={exerciseArray?.[currentIndex].repType === "time"} 
                        isTimerComplete={isTimerComplete} 
                        setIsTimerComplete={setIsTimerComplete} 
                    />
            </button>
            </>
          ))}
        </div>
    );    
}