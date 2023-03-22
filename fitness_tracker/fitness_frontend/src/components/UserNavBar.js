import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FaUser } from 'react-icons/fa';
import {Link, NavLink} from 'react-router-dom';


function UserNavBar () {
    return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Link to="/user-home" className="nav-link">Summary</Link>
        </Nav>
        <Nav className="mr-auto">
          <Link to="/reccomendations" className="nav-link">Recommendations</Link>
        </Nav>
        <Nav className="mr-auto">
            <Link to="/food" className="nav-link">Food</Link>
        </Nav>
        <Nav className="mr-auto">
            <Link to="/history" className="nav-link">History</Link>
        </Nav>
        <Nav className="ml-auto " >
          <Link to ="/profile" className="nav-link"> <FaUser /></Link>
        </Nav>
        <Nav className="ml-auto " >
          <Link to ="/" className="nav-link"> Log Out</Link>
        </Nav>

      </Navbar.Collapse>
    </Navbar>
    );
}

export default UserNavBar;