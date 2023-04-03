import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

function FitnessGoalsDropdown() {
  const [selectedGoal, setSelectedGoal] = useState('Select Fitness Goal');

  const handleSelect = (eventKey) => {
    setSelectedGoal(eventKey);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-fitness-goals">
        {selectedGoal}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="Losing weight">Losing weight</Dropdown.Item>
        <Dropdown.Item eventKey="Maintaining weight">Maintaining weight</Dropdown.Item>
        <Dropdown.Item eventKey="Gaining weight">Gaining weight</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default FitnessGoalsDropdown;
