import './Cards.css';
import { useState, useEffect } from "react";
import exercises from './exercises.json';
import { Exercise } from './Exercise';
import { GameStats } from './GameStats';

export function CardDeck() {
    const [deck, setDeck] = useState([]);
    //comparing indexes to flip cards
    const [visibleCardIndex, setVisibleCardIndex] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [isTimerComplete, setIsTimerComplete] = useState(true)
    const [isGameOver, setIsGameOver] = useState(true);
    
   //build card object with an exercise
    const suits = ['spades', 'diamonds', 'clubs', 'hearts'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const jokers = [
      { value: 'Joker', suit: 'red', numberValue: 10, exercise: exercises[0].exercise, repType: exercises[0].duration }, 
      { value: 'Joker', suit: 'black', numberValue: 10, exercise: exercises[0].exercise, repType: exercises[0].duration   }
    ];
  
    function newDeck() {
        //create deck
        const cards = suits.flatMap(suit =>
            values.map((value) => {
                //number value for each card
                let numberValue;
                if (['J', 'Q', 'K', 'A'].includes(value)) {
                    numberValue = ['J', 'Q', 'K', 'A'].indexOf(value) + 11; //assigning 11, 12, 13, 14 to J, Q, K, A
                } else {
                    numberValue = parseInt(value); //parsing the number for numerical cards
                }
                //add a random exercise to each card 
                const randomIndex = Math.floor(Math.random() * exercises.length);
                const exercise = exercises[randomIndex].exercise;        
                const repType = exercises[randomIndex].duration
              
                return { value, suit, numberValue, exercise, repType };
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
            setCurrentIndex(0)
        }
      }, [currentIndex])

      useEffect(() => {
        flipCard(0)
      }, [deck])
   
      useEffect(() => {
        newDeck()             
      }, [])


      return (
        <div  className="deckDiv">         
          {isGameOver && <GameStats deck={deck} newGame={newGame} />}
          {!isGameOver && deck.map((card, index) => visibleCardIndex === index && (
              <div key={index}>            
              <h3>Current card: {currentIndex + 1} of {deck.length}</h3>  
              <button 
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
                        deck={deck} 
                        numValue={card.numberValue} 
                        isTimed={deck[currentIndex].repType === "time"} 
                        isTimerComplete={isTimerComplete} 
                        setIsTimerComplete={setIsTimerComplete} 
                    />
            </button>
            </div>
          ))}
        </div>
    );    
}

