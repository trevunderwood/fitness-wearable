import UserNavBar from "../../components/UserNavBar";
import { Container, Row, Col } from 'react-bootstrap';
import UserCard from "../../components/UserCard";
import React, { useEffect, useState } from 'react';

function UserHome () {
    // Values that will be displayed on user home page
    const [totalSteps, setTotalSteps] = useState("900");
    const [avgHeartRate, setAvgHeartRate] = useState("85");
    const [caloriesBurnt, setCaloriesBurnt] = useState("100");
    const [caloricIntake, setCaloricIntake] = useState("200");

    useEffect(() => {
        // Fetch data from the database
        fetch('/api/userData')
          .then(response => response.json())
          .then(data => {
            setTotalSteps(data.totalSteps);
            setAvgHeartRate(data.avgHeartRate);
            setCaloriesBurnt(data.caloriesBurnt);
            setCaloricIntake(data.caloricIntake);
          })
          .catch(error => console.error(error));
      }, []);

    return (
        <><UserNavBar />
            <div className="">
                <h1 style={{ fontSize:'60px', padding:'5px' }}>Summary</h1>
                <Container>
                    <Row xs={1} sm={2} md={2} >
                        <Col>
                            <UserCard title ="Total Steps" body={totalSteps}/>
                        </Col>

                        <Col>
                            <UserCard title ="Average Heart Rate" body ={avgHeartRate} />
                        </Col>
                        
                        <Col>
                            <UserCard title ="Calories Burnt" body ={caloriesBurnt}/>
                        </Col>
                        
                        <Col>
                            <UserCard title ="Caloric Intake" body ={caloricIntake} />
                        </Col>
                    </Row>
                </Container>
            </div>
            
        
        </>
    );
        
    
}

export default UserHome;