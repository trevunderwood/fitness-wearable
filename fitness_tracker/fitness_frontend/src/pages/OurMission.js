import {BsFillPieChartFill} from "react-icons/bs"
import {GiRunningShoe} from "react-icons/gi"
import {IoMdFitness} from "react-icons/io"
import {AiOutlineBarChart} from "react-icons/ai"


function OurMission () {
    return (
        <div className="container" style ={{ width: '100%', height: '60vh'}} >
            <h1 className = 'display-1' style={{textAlign: 'left' , paddingLeft: '10px', width: '100%'}}>Our Mission</h1>
            <div className="d-flex justify-content-center">
                
                <div className="card" style = {{width: '50%', height: '75%', backgroundColor: '#05386B', padding: '10px'}}>
                    <h3 class="display-4" style = {{ color: '#8ee4af'}}>Providing a Plaform for Healthy Habits</h3>
                    <div class ="cart-text" style = {{color: '#ffffff', padding: '15px', fontWeight:'bold'}}>
                        <h4 style={{color: 'white'}} >Affordable</h4>
                        <h4 style={{color: 'white'}}>Any Device</h4>
                        <h4 style={{color: 'white'}}>Bluetooth</h4>
                        <h4 style={{color: 'white'}}>Comfort</h4>
                        <h4 style={{color: 'white'}}>Sweatproof</h4>
                    </div>
                </div>

                <div className="icons" style = {{width: '50%'}}>
                    <div className="d-flex justify-content-evenly" style={{padding: '10px'}} >
                        <BsFillPieChartFill  style={{ fontSize: '150px', color: '#05386B' }} />
                        <GiRunningShoe  style={{ fontSize: '150px', color: '#05386B' }} />
                    </div>
                    
                    <div className="d-flex justify-content-evenly" style={{padding: '10px'}} >
                        <IoMdFitness  style={{ fontSize: '150px', color: '#05386B' }} />
                        <AiOutlineBarChart  style={{ fontSize: '150px', color: '#05386B' }} />
                    </div>
                </div>
                <div className = "Images"></div>
            </div>

        </div>
        
    );
}

export default OurMission;