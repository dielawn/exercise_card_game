import { useState, useEffect } from "react";
import './Timer.css'

export function Timer({ duration, isTimerComplete, setIsTimerComplete }) {
    const [timer, setTimer] = useState(0);
    const [countdown, setCountdown] = useState(3); //3 sec countdown before timer starts

    useEffect(() => {
        setIsTimerComplete(false);
    }, []);

    useEffect(() => {
        //handle the countdown separately from timer
        if (countdown > 0) {
            const countdownId = setInterval(() => {
                setCountdown(current => current - 1);
            }, 1000);
            return () => clearInterval(countdownId);
        }
    }, [countdown]);

    useEffect(() => {
        //once the countdown is done, start the timer
        if (countdown === 0 && !isTimerComplete) {
            const intervalId = setInterval(() => {
                setTimer(currentTimer => {
                    const newTime = currentTimer + 1;
                    if (newTime * 1000 >= duration) {
                        setTimeout(() => setIsTimerComplete(true), 0);
                        clearInterval(intervalId);
                    }
                    return newTime;
                });
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [countdown, isTimerComplete, duration, setIsTimerComplete]);

    return (
        <>
            {countdown > 0 ? <p className="leadTxt">Starting in {countdown}...</p> : <p>{timer}</p>}
        </>
    );
}
