import React, { useState, useEffect } from 'react';

export function CountdownTimer() {
    const [timer, setTimer] = useState(3); // Start the countdown at 3 seconds

    useEffect(() => {
        // Only start the countdown if the timer is greater than 0
        if (timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((currentTimer) => currentTimer - 1);
            }, 1000);

            // Cleanup: Clear the interval on component unmount or when the countdown finishes
            return () => clearInterval(intervalId);
        }
    }, [timer]); // Rerun the effect if `timer` changes

    return (
        <div>
            {timer > 0 ? <p>Countdown: {timer}</p> : <p>Countdown finished!</p>}
        </div>
    );
}


