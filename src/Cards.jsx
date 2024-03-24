import './Cards.css'
import { Exercise } from './Exercise';
import { useState, useEffect } from "react";
import exercises from './exercises.json'
import { Timer } from './Timer';

export function CardDeck({exerciseArray, setExerciseArray}) {
    const [deck, setDeck] = useState([]);
    const [visibleCardIndex, setVisibleCardIndex] = useState(null);
    const [isTimerComplete, setIsTimerComplete] = useState(true)
    const [spentDeck, setSpentDeck] = useState([]);
    const [isGameOver, setIsGameOver] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const suits = ['spades', 'diamonds', 'clubs', 'hearts'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const jokers = [{ value: 'Joker', suit: 'red', numberValue: 25 }, { value: 'Joker', suit: 'black', numberValue: 25 }];
  
    function newDeck() {
        //create deck
        const cards = suits.flatMap(suit =>
            values.map((value) => {
                // Determine the number value for each card
                let numberValue;
                if (value === 'A') {
                    numberValue = 14;
                } else if (['J', 'Q', 'K'].includes(value)) {
                    numberValue = ['J', 'Q', 'K'].indexOf(value) + 11; //assigning 11, 12, 13 to J, Q, K
                } else {
                    numberValue = parseInt(value); // Directly parsing the number for numerical cards
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
        // Toggle visibility of the clicked card
        if (visibleCardIndex === cardIndex) {
            setVisibleCardIndex(null); // Hide the card if it's already visible
        } else {
            setVisibleCardIndex(cardIndex); // Show the clicked card
        }
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
        setIsGameOver(true)
        setCurrentIndex(0)
      }, [currentIndex > 53])

      useEffect(() => {
        flipCard(0)
      }, [deck])
   
      useEffect(() => {
        function generateExerciseArray() {
            let tempArray = []
            while (tempArray.length < 53) {
                const randomIndex = Math.floor(Math.random() * exercises.length);
                const randomExercise = exercises[randomIndex].exercise;        
                tempArray.push(randomExercise)
            }
            return tempArray
        }
        newDeck()
        let tempArray = generateExerciseArray()
        setExerciseArray(tempArray)
      }, [])

      return (
        <div className="deckDiv">
          Current card: {currentIndex + 1} of {deck.length}
          {/* <Timer duration={card.value}  isTimerComplete={isTimerComplete} setIsTimerComplete={setIsTimerComplete}/> */}
          {isGameOver && <><button onClick={newGame}>Start Game<span className='cardBack'>🂠</span></button></>}
          {deck.map((card, index) => visibleCardIndex === index && (
            <button 
                key={index} 
                onClick={() => playRound(index)} 
                className={card.suit === 'hearts' || card.suit === 'diamonds' || card.suit === 'red'
                    ? 'red-suit cardBtn' : 'black-suit cardBtn'}>
                    {card.suit === 'hearts' && <span>{card.value}♥️</span>}
                    {card.suit === 'diamonds' && <span>{card.value}♦️</span>}
                    {card.suit === 'clubs' && <span>{card.value}♣️</span>}
                    {card.suit === 'spades' && <span>{card.value}♠️</span>}
                    {card.value === 'Joker' && <span>{card.value}<br></br><span className='jokerImg'>🃏</span></span>}
                    <Exercise cardIndex={currentIndex} isJoker={card.value === "Joker"} exerciseArray={exerciseArray} setExerciseArray={setExerciseArray} numValue={card.numberValue} isTimed={exerciseArray[currentIndex].duration}  />
            </button>
          ))}
        </div>
    );
    
}