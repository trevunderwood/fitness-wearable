import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logo from './fitness_tracker_logo.jpg'

function PersonalRegisterPage () {
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
                        <Form.Control type="date" placeholder="Date of Birth" style={{width: '80%',  margin: '0 auto'}} />
                    </Form.Group>

                    <Form.Group  style={{padding: '5px 5px'}}>
                        <Form.Label>Gender</Form.Label>
                        <Form.Control type="gender" placeholder="Gender" style={{width: '80%',  margin: '0 auto'}} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" style={{padding: '5px 5px'}}>
                        <Form.Label>Height</Form.Label>
                        <Form.Control type="height" placeholder="Height" style={{width: '80%',  margin: '0 auto'}}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" style={{padding: '5px 5px'}}>
                        <Form.Label>Weight</Form.Label>
                        <Form.Control placeholder="Weight" style={{width: '80%',  margin: '0 auto'}}/>
                    </Form.Group>

                    <div className="container" style={{padding: '5px 5px'}} >
                        <Link to = "/user-home"> 
                            <Button variant="primary" type="submit" style={{backgroundColor: '#05386B', color: '#8ee4af', fontWeight: 'bold', width: '55%'}}>
                                Register
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