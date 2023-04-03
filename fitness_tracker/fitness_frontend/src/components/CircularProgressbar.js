import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircleProgress = ({ calorieGoal, currentCalories }) => {
  const percentage = (currentCalories / calorieGoal) * 100;

  return (
    <div style={{ width: '175px', height: '175px' }}>
      <CircularProgressbar
        value={percentage}
        text={`${Math.round(percentage)}%`}
        styles={buildStyles({
          textSize: '16px',
          pathColor: '#8ee4af',
          textColor: 'black',
          trailColor: '#d6d6d6',
        })}
      />
    </div>
  );
};

export default CircleProgress;
