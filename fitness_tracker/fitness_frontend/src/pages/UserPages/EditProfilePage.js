import UserNavBar from "../../components/UserNavBar";
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FitnessGoalsDropdown from '../../components/FitnessGoalsDropdown';
import { useAuth } from '../../AuthContext';
import { firestore } from "../../firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function EditProfilePage () {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState('');
    const [fitnessGoals, setFitnessGoals] = useState('');
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const fetchUserData = async (uid) => {
        try {
          const userRef = doc(firestore, "users", uid);
          const userSnapshot = await getDoc(userRef);
      
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            console.log("User data:", userData);
            return userData;
          } else {
            console.error("User data not found");
            return null;
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          return null;
        }
      };

      useEffect(() => {
        if (currentUser) {
          fetchUserData(currentUser.uid).then((userData) => {
            if (userData) {
              const {
                name,
                username,
                email,
                password,
                dateOfBirth,
                gender,
                height,
                weight,
                fitnessGoals,
              } = userData;
              setName(name);
              setUsername(username);
              setEmail(email);
              setDob(dateOfBirth);
              setGender(gender);
              setHeight(height);
              setWeight(weight);
              setFitnessGoals(fitnessGoals);
            }
          });
        }
      }, [currentUser]);

      const handleFormSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const userRef = doc(firestore, "users", currentUser.uid);
          await updateDoc(userRef, {
            name,
            username,
            email,
            dateOfBirth: dob,
            gender,
            height,
            weight,
            fitnessGoals,
          });
          console.log("Profile updated successfully!")
        } catch (error) {
          console.error("Error updating profile:", error);
          alert("Error updating profile. Please try again.");
        }
        navigate('/profile');
      };


    return (
        <><UserNavBar />
        <div className="container">
            <h1>Edit Profile</h1>

            <div>
                <Container>
                    <Row xs={1} sm={2} md={2}>
                        <Form autComplete='off' onSubmit={handleFormSubmit}> 

                        <Col>
                            <Form.Group controlId="formBasicName" style={{padding: '5px 5px'}} >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="name" style={{width: '100%',  margin: '0 auto'}} value = {name}  onChange={(e) => setName(e.target.value)} required />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail" style={{padding: '5px 5px'}} >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email"  style={{width: '100%',  margin: '0 auto'}} value = {email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>


                            <Form.Group controlId="formBasicDOB" style={{padding: '5px 5px'}} >
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control type="date" value = {dob} style={{width: '100%',  margin: '0 auto'}} />
                            </Form.Group>

                            <Form.Group style={{padding: '5px 5px'}}>
                            <Form.Label>Gender</Form.Label>
                                <Form.Control as="select" value = {gender} style={{width: '100%', margin: '0 auto', borderRadius: '0'}} onChange={(e) => setGender(e.target.value)}>
                                    <option value="">Choose gender...</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="formBasicHeight" style={{padding: '5px 5px'}}>
                                <Form.Label>Height (inches)</Form.Label>
                                <Form.Control type="number" min="1" max="120" value = {height} style={{width: '80%',  margin: '0 auto'}} onChange={(e) => setHeight(e.target.value)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicWeight" style={{padding: '5px 5px'}}>
                                <Form.Label>Weight (lbs)</Form.Label>
                                <Form.Control type="number" value = {weight} style={{width: '80%',  margin: '0 auto'}} onChange={(e) => setWeight(e.target.value)}/>
                            </Form.Group>

                            <Form.Group style={{padding: '5px 5px'}}>
                            <Form.Label>Fitness Goals</Form.Label>
                                <Form.Control as="select" value = {fitnessGoals} style={{width: '100%', margin: '0 auto', borderRadius: '0'}} onChange={(e) => setFitnessGoals(e.target.value)}>
                                <option value="">Choose Fitness Goals...</option>
                                <option value="Maintain Weight">Maintain Weight</option>
                                <option value="Gaining Weight">Gaining Weight</option>
                                <option value="Losing Weight">Losing Weight</option>
                                </Form.Control>
                            </Form.Group>

                        </Col>
                        </Form>
                    </Row>
                </Container>
            </div>
            <button type="submit" onClick = {handleFormSubmit} class="btn btn-primary">Save Changes</button>
            
            <Link to = "/profile">
                <button type="button" class="btn btn-outline-secondary">Cancel</button>
            </Link>
            



            
        </div></>
    );
}

export default EditProfilePage;