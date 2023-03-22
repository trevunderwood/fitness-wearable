import UserNavBar from "../../components/UserNavBar";
import { Container, Row, Col } from 'react-bootstrap';
import UserCard from "../../components/UserCard";


function UserHome () {
    return (
        <><UserNavBar />
            <div className="">
                <h1>Summary</h1>
                <Container>
                    <Row xs={1} sm={2} md={2} >
                        <Col>
                            <UserCard title ="Total Steps" body="900 steps"/>
                        </Col>

                        <Col>
                            <UserCard title ="Average Heart Rate" body ="89BPM" />
                        </Col>
                        
                        <Col>
                            <UserCard title ="Calories Burnt" body ="550 Cal"/>
                        </Col>
                        
                        <Col>
                            <UserCard title ="Caloric Intake" body ="1550 Cal" />
                        </Col>
                    </Row>
                </Container>
            </div>
            
        
        </>
    );
        
    
}

export default UserHome;