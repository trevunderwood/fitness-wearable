import React, { useState, useEffect } from 'react';
import UserNavBar from "../components/UserNavBar";
import Button from 'react-bootstrap/Button';

function WorkoutPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const [workoutDuration, setWorkoutDuration] = useState(null);

  const handleClick = () => {
    if (isRunning) {
      setIsRunning(false);
      setEndTime(Date.now());
      setWorkoutDuration((Date.now() - startTime) / 1000);
    } else {
      setIsRunning(true);
      setStartTime(Date.now());
      setEndTime(null);
      setElapsedTime(null);
      setWorkoutDuration(null);
    }
  };

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isRunning, startTime]);

  return (
    <>
      <UserNavBar />
      <div className="container mt-5">
        <h1>Workout Timer</h1>
        <p>
          Please wait 5-6 seconds before beginning your workout after clicking the button.
        </p>
        <Button
          onClick={handleClick}
          variant={isRunning ? 'danger' : 'success'}
        >
          {isRunning ? 'Stop' : 'Start'}
        </Button>
        <p className="mt-3">
          {isRunning
            ? `Workout in progress: ${(elapsedTime / 1000).toFixed(1)} seconds`
            : workoutDuration
            ? `Workout duration: ${workoutDuration.toFixed(1)} seconds`
            : 'No workout recorded'}
        </p>
      </div>
    </>
  );
}

export default WorkoutPage;
