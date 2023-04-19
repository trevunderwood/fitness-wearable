import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logo from './fitness_tracker_logo.jpg'
import { useState } from 'react';
import {auth, firestore} from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router';



function RegisterPage () {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [fitnessGoals, setFitnessGoals] = useState('');
    const navigate = useNavigate();

    const isFormComplete = name && email && username && password && dateOfBirth && gender && height && weight;

    const sendUser = async (UID) => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/add-user/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ UID }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            console.log("Successfully Registered User");
            return data.result;
          } else {
            throw new Error(data.error);
          }
        } catch (error) {
          console.error('Error Registering User', error);
          alert(error);
        }
      };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (isFormComplete) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Save user data to Firestore
            const userRef = doc(collection(firestore, "users"), user.uid);
            const UID = user.uid;
            sendUser(UID);
            await setDoc(userRef, {
            name,
            username,
            email,
            dateOfBirth,
            gender,
            height,
            weight,
            fitnessGoals,
            });
            // Redirect to user home
            console.log("Redireciting to Home");
            navigate('/');
        } catch (error) {
            console.error("Error registering user:", error.message);
        }
        }
    };

      

    return (
        <div class = "container" style={{padding : '5px 0'}}>
            
            <div class = "reg_container">
            <Row className="justify-content-center mt-5">
                <Col xs={12} sm={8} md={6} lg={4}>

                    <Link to="/">
                        <div className="d-flex justify-content-center mb-3">
                            <img src={logo} alt="Logo" style={{ height: '160px' }} />
                        </div>
                    </Link>

                    <h1 style={{fontWeight: 'bold', color: '#05386B'}}> Fitness Tracker </h1>
                    <Form >

                    <Form.Group controlId="formBasicName" style={{padding: '5px 5px'}} >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} style={{width: '80%',  margin: '0 auto'}} required />
                    </Form.Group>


                    <Form.Group controlId="formBasicEmail" style={{padding: '5px 5px'}} >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} style={{width: '80%',  margin: '0 auto'}} required />
                    </Form.Group>

                    <Form.Group  style={{padding: '5px 5px'}}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control  placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={{width: '80%',  margin: '0 auto'}} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" style={{padding: '5px 5px'}}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{width: '80%',  margin: '0 auto'}} required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" style={{padding: '5px 5px'}} >
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="date" placeholder="Date of Birth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} style={{ width: '80%', margin: '0 auto' }} />
                    </Form.Group>

                    <Form.Group style={{padding: '5px 5px'}}>
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)} style={{width: '80%', margin: '0 auto', borderRadius: '0'}}>
                            <option value="">Choose gender...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formBasicHeight" style={{padding: '5px 5px'}}>
                        <Form.Label>Height (inches)</Form.Label>
                        <Form.Control type="number" min="1" max="120" placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} style={{width: '80%',  margin: '0 auto'}}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicWeight" style={{padding: '5px 5px'}}>
                        <Form.Label>Weight (lbs)</Form.Label>
                        <Form.Control type="number" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} style={{width: '80%',  margin: '0 auto'}}/>
                    </Form.Group>

                    <Form.Group style={{padding: '5px 5px'}}>
                        <Form.Label>Fitness Goals</Form.Label>
                        <Form.Control as="select" value={fitnessGoals} onChange={(e) => setFitnessGoals(e.target.value)} style={{width: '80%', margin: '0 auto', borderRadius: '0'}}>
                            <option value="">Choose Fitness Goals...</option>
                            <option value="Maintain Weight">Maintain Weight</option>
                            <option value="Gaining Weight">Gaining Weight</option>
                            <option value="Losing Weight">Losing Weight</option>
                        </Form.Control>
                    </Form.Group>


                                    
                    <div className="container" style={{padding: '5px 5px'}} >
                            <Button variant="primary" type="submit" onClick={handleRegister} style={{backgroundColor: '#05386B', color: '#8ee4af', fontWeight: 'bold', width: '55%'}}>
                                Register
                            </Button>
                        
                    </div>
                    </Form>
                    <div className="container" style={{padding: '5px 5px'}} >
                        <p> Have an account already? 
                            <Link to = "/sign-in" style ={{textDecoration: 'None', color: 'black'}}>
                                 Sign In
                            </Link>
                        </p>
                    </div>
                    
                </Col>
                </Row>
            </div>
                
        </div>
    );
}

export default RegisterPage;