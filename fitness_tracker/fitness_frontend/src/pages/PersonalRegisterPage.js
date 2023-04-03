import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logo from './fitness_tracker_logo.jpg'
import FitnessGoalsDropdown from '../components/FitnessGoalsDropdown';
import { useState } from 'react';

function PersonalRegisterPage () {

    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [fitnessGoals, setFitnessGoals] = useState('');

    const isFormComplete = dateOfBirth && gender && height && weight;


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
                    <Form.Group controlId="formBasicEmail" style={{padding: '5px 5px'}} >
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="date" placeholder="Date of Birth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} style={{ width: '80%', margin: '0 auto' }} />
                    </Form.Group>

                    <Form.Group style={{padding: '5px 5px'}}>
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)} style={{width: '80%', margin: '0 auto', borderRadius: '0'}}>
                            <option value="">Choose gender...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
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

                    <Form.Group controlId="formFitnessGoals"  style={{padding: '5px 5px'}}>
                        <Form.Label>Fitness Goals</Form.Label>
                        <FitnessGoalsDropdown />
                    </Form.Group>


                    <div className="container" style={{padding: '5px 5px'}} >
                        <Link to={isFormComplete ? '/user-home' : '#'}> 
                            <Button variant="primary" type="submit" disabled={!isFormComplete} style={{backgroundColor: '#05386B', color: '#8ee4af', fontWeight: 'bold', width: '55%'}}>
                                Start Tracking! 
                            </Button>
                        </Link>
                        
                    </div>
                    </Form>
                    
                </Col>
                </Row>
            </div>
                
        </div>
    );
}

export default PersonalRegisterPage;