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
        {/* <Nav className="mr-auto">
            <Link to="/history" className="nav-link">History</Link>
        </Nav> */}
        </div>
        <div className='right-components' style={{display: 'flex', flexDirection: 'row', marginLeft: 'auto' , justifyContent: 'flex-end'}}>
        <Nav className="ml-auto " >
          <Link to ="/profile" className="nav-link"> <FaUser /></Link>
        </Nav>
        <Nav className="ml-auto " >
          <Link to ="/connection" className="nav-link">Connection</Link>
        </Nav>
        <Nav className="ml-auto " >
          <Link to ="/" className="nav-link"> Log Out</Link>
        </Nav>
        </div>

      </Navbar.Collapse>
    </Navbar>
    );
}

export default UserNavBar;