import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FaUser } from 'react-icons/fa';
import {Link, NavLink} from 'react-router-dom';
import './style.css'


function UserNavBar () {
    return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className='left-components'>
        <Nav className="mr-auto" >
        <Link to="/user-home" className="nav-link">Summary</Link>
        </Nav>
        <Nav className="mr-auto">
          <Link to="/reccomendations" className="nav-link">Recommendations</Link>
        </Nav>
        <Nav className="mr-auto">
            <Link to="/food" className="nav-link">Food</Link>
        </Nav>
        <Nav className="mr-auto">
            <Link to="/workout" className="nav-link">Workout</Link>
        </Nav>
        </div>
        <div className='right-components'>
        <Nav>
          <Link to ="/connection" className="nav-link">Connect</Link>
        </Nav>
        <Nav className='profile-logo'>
          <Link to ="/profile" className="nav-link"><FaUser /></Link>
        </Nav>
        <Nav className="ml-auto " >
          <Link to ="/" className="nav-link">Log Out</Link>
        </Nav>
        </div>

      </Navbar.Collapse>
    </Navbar>
    );
}

export default UserNavBar;