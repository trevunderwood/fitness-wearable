
import OurMission from './OurMission'
import {Link} from 'react-router-dom'; 
import fit_logo from './trans_fitness_tracker_logo.png';
import HomeNavBar from '../components/HomeNavBar';

function HomePage() {
    return (
        <><HomeNavBar /><>
        <div style={{ textAlign: 'center', backgroundColor: '#05386B', width: '100%', height: '89vh' }}>


            <div className="container">
                <br />
                <br />
                <br />
                <br />
                <br />
                <div class='test'>
                    <h1 style={{ color: '#8ee4af', fontWeight: 'bold', fontSize: '55px' }}>Welcome to Fitness Tracker</h1>
                </div>
                <div style={{ color: '05386B' }}>
                    <button className="btn btn-primary btn-lg " style={{ backgroundColor: '#8ee4af', color: '#05386B', fontWeight: 'bold' }}>
                        <Link to="/sign-in" style={{ textDecoration: 'none', color: '#05386B' }}> Get Tracking!</Link>
                    </button>
                </div>
                <img src={fit_logo} alt="Logo" style={{ height: '220px' }}></img>
            </div>

            

        </div><OurMission></OurMission></></>
    

        

        
    );
} 
export default HomePage;