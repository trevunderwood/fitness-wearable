import UserNavBar from "../../components/UserNavBar";
import { Container, Row, Col } from 'react-bootstrap';
import CircleProgress from "../../components/CircularProgressbar";
import './styles/foodstyles.css';
import React, { useState, useEffect } from 'react';
import {Form} from 'react-bootstrap';
import { useAuth } from "../../AuthContext";
import { ref, onValue, off } from "firebase/database";
import { database } from "../../firebase";



function FoodPage () {
    const calorieGoal = 2000;
    const [currentCalories, setCurrentCalories] = useState(0);
    const [exercises, setExercises] = useState(null);
    const [foodName, setFoodName] = useState('');
    const [top5Lacking, setTop5Lacking] = useState([]);
    const [top5letters, setTop5letters] = useState("");

    const { currentUser } = useAuth();

    const resetCalories = async () => {
      const resetResponse = await fetchReset(currentUser.uid);
      console.log("Current User UID:" , currentUser.uid);
      setCurrentCalories(0);
      setTop5Lacking([]);
    };

    const fetchExercise = async (UserID) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/recommend-exercise/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ UserID }),
            });

            //console.log("Data from API: ",data);
            const data = await response.json();

            if (response.ok) {
                return data.result;
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Error fetching Exercises:', error);
            alert(error);
        }
    };

  
    // Add this function inside your component
    const fetchDailyCalorieCount = async () => {
      
      const displayResponse = await fetchDisplayCal(currentUser.uid);
      console.log("Current UID: ", currentUser.uid);
      console.log('Calories: ', displayResponse);
      
      
    setCurrentCalories(displayResponse);
    };

    const fetchDisplayCal = async (UserID) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/display-calories/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ UserID }),
        });
        
        const data = await response.json();
  
        if (response.ok) {
          return data.result;
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error('Error displaying calories:', error);
        alert(error);
      }
    };

      const fetchCalories = async (food, UserID) => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/tracker-api/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ food, UserID }),
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

      const fetchReset = async (UID) => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/reset-nutrients/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ UID }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            return data.result;
          } else {
            throw new Error(data.error);
          }
        } catch (error) {
          console.error('Error resetting calories:', error);
          alert(error);
        }
      };

      const addCalories = async () => {
        const foodResponse = await fetchCalories(foodName, currentUser.uid);
        console.log("Current User UID:" , currentUser.uid);

        // console.log(foodResponse.nutrient_name.indexOf("Energy"));
          
        const caloriesToAdd = foodResponse.val[foodResponse.nutrient_name.indexOf("Energy")];

        if (caloriesToAdd) {
          setCurrentCalories(currentCalories + caloriesToAdd);
          setFoodName("");
        }
      };


      const fetchFoodReccomendations = async (UserID) => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/recommend-food/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ UserID }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            return data.result;
          } else {
            throw new Error(data.error);
          }
        } catch (error) {
          console.error('Error fetching reccomendations:', error);
          alert(error);
        }
      };


      const handleGenerateRecommendations = async () => {
        const UserID = currentUser.uid;
        const nutrientData = await fetchFoodReccomendations(UserID); // Replace the argument with the appropriate data, if needed
        const exerciseData = await fetchExercise(UserID);
        fetchExercise(UserID).then(result => setExercises(result));
        const nutrientResult = nutrientData.slice(0,5);
        setTop5Lacking(nutrientResult);
        setTop5letters("These are the top 5 nutrients to try to eat more of:");
      };
      
  
      const handleInputChange = (event) => {
        setFoodName(event.target.value);
      };

      useEffect(() => {
        if (currentUser) {
          fetchDailyCalorieCount();
        }
      }, [currentUser]);
      

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
                            <button type="button" class="btn btn-danger"  onClick={resetCalories}>Reset Calories</button>
                            </div>
                        </Col>
                
                    </Row>
                </Container>

                <Container>
                  <Row xs={1} sm={1} md={1} >
                      <Col>
                        <button type="button" class="btn btn-primary" onClick={handleGenerateRecommendations}> Generate Recommendations</button>
                      </Col>

                      <Col> 
                      <h3>{top5letters}</h3>
                      <ul>
                        {top5Lacking.map((nutrient) => (
                          <li style={{margin: 'center'}} key={nutrient}>{nutrient}</li>
                        ))}
                      </ul>
                      </Col>
                      <div className="container">
                <h1></h1>
                {Array.isArray(exercises) ? (
                    <ul>
                      Potential Changes to Exercise Level
                        {exercises.map((exercise, index) => (
                            <li key={index}>{exercise.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>{exercises}</p>
                )}
            </div>
                  </Row>
          

                </Container>
                
                
        </div></>
    );
}

export default FoodPage;