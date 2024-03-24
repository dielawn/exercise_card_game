import { useState } from "react"
import exercises from './exercises.json'

export function FilterSelect({exerciseArray, setExerciseArray}) {

    
    function handleExerciseChange(exerciseName, isChecked) {
        if (isChecked) {
            // Remove the exercise from the array
            const filteredArray = exerciseArray.filter(item => item.exercise !== exerciseName);
            setExerciseArray(filteredArray);
        } else {
            const filteredArray = exerciseArray.filter(item => item.exercise == exerciseName);
            setExerciseArray(filteredArray);
        }
    }

    return (
        <div>
            <fieldset>
                <legend>Exclude:</legend>
               {exercises.map((ex, index) => (
                    <label key={index}>{ex.exercise}
                        <input
                            type="checkbox"
                            value={ex.exercise}
                            onChange={(e) => handleExerciseChange(ex.exercise, e.target.checked)}
                        />
                    </label>
               ))}
            </fieldset>
        </div>
    )
}