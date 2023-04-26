import React, { useState, useEffect } from 'react';
import UserNavBar from "../../components/UserNavBar";
import Button from 'react-bootstrap/Button';
import { useAuth } from "../../AuthContext";
import { ref, onValue, off, get ,update } from 'firebase/database'; // Add this import
import { database } from "../../firebase";
import firebase from "firebase/compat/app";


function WorkoutPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const [workoutDuration, setWorkoutDuration] = useState(null);
  const [restingHR, setRestingHR] = useState(null);

  const { currentUser } = useAuth();
  const userId = currentUser.uid;

  const recordWorkout = async (time, RestHR, UserID) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/calc-calories/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ time, RestHR, UserID }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Workout Recorded");
        return data.result;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error recording Workout:', error);
      alert(error);
    }
  };


  const handleClick = async () => {
    if (isRunning) {
      setIsRunning(false);
      setEndTime(Date.now());
      const duration = (Date.now() - startTime) / 1000;
      setWorkoutDuration(duration);
      // Call recordWorkout function with necessary parameters
      console.log('Duration', duration);
      console.log('RestingHR', restingHR);
      recordWorkout(duration, restingHR , currentUser.uid);
      // console.log("Burned: ", calsburned);

      // const userRef = firebase.database().ref(`Users/${userId}`);
      // const userRef = ref(database, `Users/${userId}`);
      


      // const snapshot = await get(userRef);
      // const currentDailyCalorieBurned = snapshot.val().DailyCalorieBurned;
      // console.log(currentDailyCalorieBurned);
      // console.log(calsburned);

      // await update({ 'DailyCalorieBurned': currentDailyCalorieBurned + calsburned });
      
    } else {
      setIsRunning(true);
      setStartTime(Date.now());
      setEndTime(null);
      setElapsedTime(null);
      setWorkoutDuration(null);


      const userRef = ref(database, `Users/${userId}`);
      
      const listener = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setRestingHR(data.AverageHR);
      });
      
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
