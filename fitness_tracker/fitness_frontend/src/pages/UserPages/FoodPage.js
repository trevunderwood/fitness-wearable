import UserNavBar from "../../components/UserNavBar";
import { Container, Row, Col } from 'react-bootstrap';
import CircleProgress from "../../components/CircularProgressbar";
import './styles/foodstyles.css';
import React, { useState } from 'react';
import {Form} from 'react-bootstrap';

function FoodPage () {
    const calorieGoal = 2000;
    const [currentCalories, setCurrentCalories] = useState(0);
    // const [caloriesToAdd, setCaloriesToAdd] = useState('');
    const [foodName, setFoodName] = useState('');

    const resetCalories = () => {
      setCurrentCalories(0);
    };


      const fetchCalories = async (food) => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/tracker-api/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ food }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            return data.result;
          } else {
            throw new Error(data.error);
          }
        } catch (error) {
          console.error('Error fetching calories:', error);
          alert(error);
        }
      };

      const addCalories = async () => {
        const foodResponse = await fetchCalories(foodName);

        console.log(foodResponse.nutrient_name.indexOf("Energy"));
          
        const caloriesToAdd = foodResponse.val[foodResponse.nutrient_name.indexOf("Energy")];

        if (caloriesToAdd) {
          setCurrentCalories(currentCalories + caloriesToAdd);
          setFoodName('');
        }
      };
    
      const handleInputChange = (event) => {
        setFoodName(event.target.value);
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
                                <Form.Control type="text" placeholder="Name of Food Item" value={foodName} onChange={handleInputChange} style={{width: '80%',  margin: '0 auto'}}/>
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