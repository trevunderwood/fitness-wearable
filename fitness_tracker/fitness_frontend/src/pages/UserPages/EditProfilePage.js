import UserNavBar from "../../components/UserNavBar";
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FitnessGoalsDropdown from '../../components/FitnessGoalsDropdown';

function EditProfilePage () {
    return (
        <><UserNavBar />
        <div className="container">
            <h1>Edit Profile</h1>

            <div>
                <Container>
                    <Row xs={1} sm={2} md={2}>
                        <Form autComplete='off'> 

                        <Col>
                            <Form.Group controlId="formBasicName" style={{padding: '5px 5px'}} >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="name" placeholder="Enter name" style={{width: '100%',  margin: '0 auto'}} required />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail" style={{padding: '5px 5px'}} >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" style={{width: '100%',  margin: '0 auto'}} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword" style={{padding: '5px 5px'}}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" style={{width: '100%',  margin: '0 auto'}} required/>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail" style={{padding: '5px 5px'}} >
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control type="date" placeholder="Date of Birth" style={{width: '100%',  margin: '0 auto'}} />
                            </Form.Group>

                            <Form.Group style={{padding: '5px 5px'}}>
                            <Form.Label>Gender</Form.Label>
                                <Form.Control as="select" style={{width: '100%', margin: '0 auto', borderRadius: '0'}}>
                                    <option value="">Choose gender...</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="formBasicHeight" style={{padding: '5px 5px'}}>
                                <Form.Label>Height (inches)</Form.Label>
                                <Form.Control type="number" min="1" max="120" placeholder="Height" style={{width: '80%',  margin: '0 auto'}}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicWeight" style={{padding: '5px 5px'}}>
                                <Form.Label>Weight (lbs)</Form.Label>
                                <Form.Control type="number" placeholder="Weight" style={{width: '80%',  margin: '0 auto'}}/>
                            </Form.Group>

                            <Form.Group controlId="formFitnessGoals" style={{padding: '5px 5px'}}>
                                <Form.Label>Fitness Goals</Form.Label>
                                <FitnessGoalsDropdown />
                            </Form.Group>
                        </Col>


                        
                        </Form>
                    </Row>
                </Container>
            </div>
            <button type="button" class="btn btn-primary">Save Changes</button>
            
            <Link to = "/profile">
                <button type="button" class="btn btn-outline-secondary">Cancel</button>
            </Link>
            



            
        </div></>
    );
}

export default EditProfilePage;