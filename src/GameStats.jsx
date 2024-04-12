import { useEffect, useState } from "react";

export function GameStats({deck , newGame}) {
    const [stats, setStats] = useState([])

    const startMsg = `Click Cards to Advance.`

    function getGameStats() {
        const statsObj = {}
  
        deck.forEach((card, index) => {
          const exerciseInfo = deck[index]
          const {exercise, repType} = exerciseInfo
  
          //if exercise is not in obj initialize it
          if (!statsObj[exercise]) {        
            statsObj[exercise] = { totalQty: 0, isTimed: repType === 'time' };
          }
  
          //accumulate qty based on card value
          const qtyToAdd = card.numberValue
          statsObj[exercise].totalQty += qtyToAdd
        });
        
        //convert statsObj to an array
        const statsArray = Object.keys(statsObj).map(key => ({
          exercise: key,
          totalQty: statsObj[key].totalQty,
          isTimed: statsObj[key].isTimed
        }));
  
        setStats(statsArray)
      }

      useEffect(() => {
        getGameStats()
      }, [])

      return (
        <>
            <div className='statsDiv'>
                <h3>{stats.length} Exercises completed!</h3>
                {stats.map((stat, index) => (<p key={index} className='statsList'> {stat.exercise} {stat.isTimed ? `${stat.totalQty * 5} sec` : `${stat.totalQty} reps`}</p>))}
            </div>
            <button className='newGameBtn' onClick={newGame}><span className='startBtnTxt'>Start Game <br></br><br></br>{startMsg}</span><span className='cardBack'>🂠</span></button>
        </>
      )
}