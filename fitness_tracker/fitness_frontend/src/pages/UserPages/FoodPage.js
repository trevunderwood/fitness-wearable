import UserNavBar from "../../components/UserNavBar";
import { Container, Row, Col } from 'react-bootstrap';
import CircleProgress from "../../components/CircularProgressbar";
import './styles/foodstyles.css';
import React, { useState } from 'react';
import {Form} from 'react-bootstrap';

function FoodPage () {
    const calorieGoal = 2000;
    const [currentCalories, setCurrentCalories] = useState(0);
    const [caloriesToAdd, setCaloriesToAdd] = useState('');

    const resetCalories = () => {
      setCurrentCalories(0);
    };

    const addCalories = () => {
        setCurrentCalories(currentCalories + caloriesToAdd);
        setCaloriesToAdd('');
      };
    
      const handleInputChange = (event) => {
        setCaloriesToAdd(Number(event.target.value));
      };


    return (
        <><UserNavBar></UserNavBar>
        <div className="container">
            <h1 style={{padding: '5px'}}>Food info</h1>
            
            <Container>
                    <Row xs={1} sm={2} md={2} >
                        <Col>
                            <div className="container d-flex align-items-center justify-content-center" style={{padding: '5px'}}>
                                <CircleProgress calorieGoal={calorieGoal} currentCalories={currentCalories} />
                            </div>
                            
                        </Col>
                        <Col>
                            <div className="food-container">
                                <h3>Current Calorie Count</h3>
                                <p>{currentCalories} cals</p>
                            </div>

                            <div className="food-container">
                                <h3>Calorie Goal</h3>
                                <p>{calorieGoal} cals</p>
                            </div>

                            <div className="food-container" >
                                <h3>Log Calories </h3>
                                <Form.Control type="number" placeholder="Calories to Add" value={caloriesToAdd} onChange={handleInputChange} style={{width: '80%',  margin: '0 auto'}}/>
                                <button type="button" class="btn btn-secondary" onClick={addCalories}>Add Calories</button>
                            </div>

                            <div className="food-container">
                                <h3>Our Reccomendations</h3>
                                <p>You should eat more !</p>
                            </div>
                        </Col>
                
                    </Row>
                </Container>

                <button type="button" class="btn btn-danger"  onClick={resetCalories}>Reset Calories</button>
        </div></>
    );
}

export default FoodPage;