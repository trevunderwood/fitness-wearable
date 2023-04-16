import UserNavBar from "../../components/UserNavBar";
import { Container, Row, Col } from 'react-bootstrap';
import './styles/profilepagestyles.css';
import { useState } from "react";
import {Link} from 'react-router-dom';



function ProfilePage () {
    const [name, setName] = useState('John Doe');
    const [username, setUsername] = useState('johndoe');
    const [password, setPassword] = useState('********');
    const [email, setEmail] = useState('john@example.com');
    const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
    const [dob, setDob] = useState('01/01/2000');
    const [gender, setGender] = useState('Male');
    const [height, setHeight] = useState("85");
    const [weight, setWeight] = useState('170');
    const [fitnessGoals, setFitnessGoals] = useState('Lose weight');
    
    return (
        <><UserNavBar></UserNavBar>
        <div className="container">
            <h1>
                Profile
            </h1>
            <div>
                <Container>
                    <Row xs={1} sm={2} md={2}>
                        <Col>
                            <div className="profile-card">
                                <h3>Name</h3>
                                <p>{name}</p>
                            </div>
                            
                        </Col>
        
                        <Col>
                        <div className="profile-card">
                            <h3>Username</h3>
                            <p>{username}</p>

                        </div>
                            
                        </Col>
                            <div className="profile-card">
                                <h3>Password</h3>
                                <p>{password}</p>
                            </div>

                        <Col>
                            <div className="profile-card">
                                <h3>Email</h3>
                                <p>{email}</p>
                            </div>
                        </Col>

                        <Col>
                            <div className="profile-card">
                                <h3>Phone Number</h3>
                                <p>{phoneNumber}</p>

                            </div>
                        </Col>

                         <Col>
                            <div className="profile-card">
                                <h3>Date of Birth</h3>
                                <p>{dob}</p>
                            </div>
                        </Col>

                         <Col>
                            <div className="profile-card">
                                <h3>Gender</h3>
                                <p>{gender}</p>
                            </div>
                            
                        </Col>

                         <Col>
                            <div className="profile-card">
                                <h3>Height</h3>
                                <p>{height}</p>
                            </div>
                        </Col>

                        <Col>
                            <div className="profile-card">
                                <h3>Weight</h3>
                                <p>{weight}</p>
                            </div>
                        </Col>

                        <Col>
                            <div className="profile-card">
                                <h3>Fitness Goals</h3>
                                <p>{fitnessGoals}</p>

                            </div>
                            
                        </Col>
                    </Row>
                </Container>
                <Link to = "/edit-profile">
                    <button type="button" class="btn btn-primary">Edit</button>
                </Link>

                
            </div>
        </div></>
    );
}

export default ProfilePage;