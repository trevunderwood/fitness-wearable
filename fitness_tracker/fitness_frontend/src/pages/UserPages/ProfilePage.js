import UserNavBar from "../../components/UserNavBar";
import { Container, Row, Col } from 'react-bootstrap';
import './styles/profilepagestyles.css';
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import {useAuth} from '../../AuthContext';
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase";


function ProfilePage () {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState('');
    const [fitnessGoals, setFitnessGoals] = useState('');

    const { currentUser } = useAuth();

    const fetchUserData = async (uid) => {
        try {
          const userRef = doc(firestore, "users", uid);
          const userSnapshot = await getDoc(userRef);
      
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            // console.log("User data:", userData);
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


                        <Col>
                            <div className="profile-card">
                                <h3>Email</h3>
                                <p>{email}</p>
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
                    <button style={{marginBottom: '5px'}} type="button" class="btn btn-primary">Edit</button>
                </Link>
            </div>
        </div></>
    );
}

export default ProfilePage;