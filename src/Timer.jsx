import { useState, useEffect } from "react";

export function Timer({ duration, isTimerComplete, setIsTimerComplete }) {
    const [timer, setTimer] = useState(0)
   
  
    useEffect(() => {
        // Only start the timer if it's not marked as complete.
        if (!isTimerComplete) {
            const intervalId = setInterval(() => {
                setTimer((prevTimer) => {
                    const newTime = prevTimer + 1;
                    if (newTime * 1000 >= duration) {
                        // Stop the timer when it reaches the duration
                        clearInterval(intervalId);
                        setIsTimerComplete(true);
                    }
                    return newTime;
                });
            }, 1000);
                // Cleanup function to clear the interval on component unmount or timer completion
                return () => clearInterval(intervalId);
            }
    }, [isTimerComplete, duration]);



  return (
    <>
    {<p>{timer}</p>}
    </>
  )
}