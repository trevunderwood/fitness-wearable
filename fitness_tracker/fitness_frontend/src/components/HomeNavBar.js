import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FaUser } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import './style.css';
// import {Link} from 'react-router-dom';


function HomeNavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto-home">
          <Link to="/" className="nav-link">Home</Link>
        </Nav>
        <Nav className="ml-auto-home">
          <Link to="/sign-in" className="nav-link"><FaUser /></Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HomeNavBar;