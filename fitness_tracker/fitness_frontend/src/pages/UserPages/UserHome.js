import UserNavBar from "../../components/UserNavBar";
import { Container, Row, Col } from 'react-bootstrap';
import UserCard from "../../components/UserCard";
import React, { useEffect, useState } from 'react';
import {useAuth} from '../../AuthContext';
import { ref, onValue, off} from 'firebase/database'; // Add this import
import { database } from "../../firebase";





function UserHome () {
    // Values that will be displayed on user home page
    const [totalSteps, setTotalSteps] = useState("900");
    const [avgHeartRate, setAvgHeartRate] = useState("85");
    const [caloriesBurnt, setCaloriesBurnt] = useState("100");
    const [caloricIntake, setCaloricIntake] = useState("200");


    const { currentUser } = useAuth();

    useEffect(() => {
        //console.log("UID: ", currentUser.uid)
        const userId = currentUser.uid; // Replace this with the user ID you want to fetch data for
    
        const userRef = ref(database, `Users/${userId}`);
        const nutrientRef = ref(database,  `Users/${userId}/Nutrients/Calories`);
        const listener = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            console.log("Date of Birth", data.AverageHR);
            setTotalSteps(data.TotalSteps);
            setAvgHeartRate(data.AverageHR);
            setCaloriesBurnt(data.DailyCalorieBurned);
            //setCaloricIntake(data.DailyCalorieCount);
             // Cleanup the listener when the component is unmounted
        // console.log("Fetched Date", data.totalSteps);
          });
        const listener2 = onValue(nutrientRef, (snapshot)=>{
            const data = snapshot.val();
            setCaloricIntake(data.CaloriesVal);
        });
    
       
        return () => {
            off(userRef, listener);
        };
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