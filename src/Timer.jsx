import { useState, useEffect } from "react";

export function Timer({ duration, isTimerComplete, setIsTimerComplete }) {
    const [timer, setTimer] = useState(0);
    const [countdown, setCountdown] = useState(3); // Starting countdown from 3

    useEffect(() => {
        setIsTimerComplete(false);
    }, []);

    useEffect(() => {
        // Handle the countdown separately
        if (countdown > 0) {
            const countdownId = setInterval(() => {
                setCountdown(current => current - 1);
            }, 1000);
            return () => clearInterval(countdownId);
        }
    }, [countdown]);

    useEffect(() => {
        // Once the countdown is done, start the timer
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
            {countdown > 0 ? <p>Starting in {countdown}...</p> : <p>{timer}</p>}
        </>
    );
}
