import React from 'react';
import { Card } from 'react-bootstrap';

function UserCard(props) {
  return (
    <div class="d-flex justify-content-center">
        <Card className="bg-green text-white rounded mb-3" style={{height: '150px', backgroundColor: '#8ee4af', width: '250px'}}>
        <Card.Body>
            <Card.Title className="text" style= {{color: '#004aad'}} >{props.title}</Card.Title>
            <Card.Text style={{fontSize: '50px', color: '#05386b'}}>
            {props.body}
            </Card.Text>
        </Card.Body>
        </Card>
    </div>
    
  );
}

export default UserCard;
