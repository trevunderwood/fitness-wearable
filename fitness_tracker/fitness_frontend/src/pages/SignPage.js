import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from './fitness_tracker_logo.jpg'

function SignPage() {
    return (
        <div class = "container" style={{padding : '5px 0'}}>
            <Row className="justify-content-center mt-5">
            <Col xs={12} sm={8} md={6} lg={4}>
                    <Link to="/">
                        <div className="d-flex justify-content-center mb-3">
                            <img src={logo} alt="Logo" style={{ height: '160px' }} />
                        </div>
                    </Link>
                    
                <h1 style={{fontWeight: 'bold', color: '#05386B'}}> Fitness Tracker </h1>
                <Form autoComplete='off' >
                <Form.Group controlId="formBasicEmail" style={{padding: '5px 5px'}} >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" style={{width: '80%',  margin: '0 auto'}} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" style={{padding: '5px 5px'}}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" style={{width: '80%',  margin: '0 auto'}}/>
                </Form.Group>
                <div className="container" style={{padding: '5px 5px'}} >
                    <Link to = "/user-home">
                        <Button variant="primary" type="submit" style={{backgroundColor: '#05386B', color: '#8ee4af', fontWeight: 'bold', width: '55%'}}>
                            Sign In
                        </Button>
                    </Link>
                </div>
                </Form>
                <div className="container" style={{padding: '5px 5px'}} >
                    <p> Don't have an accout? 
                        <Link to = "/register" style={{textDecoration: 'None', color: 'black', padding: '6px'}}>
                         Sign Up
                        </Link>
                    </p>
                </div>
                
            </Col>
            </Row>
        </div>
        
        

    );
}

export default SignPage;