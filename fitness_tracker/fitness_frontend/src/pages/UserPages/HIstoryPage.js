import UserNavBar from "../../components/UserNavBar";
import { Table } from 'react-bootstrap';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useState } from 'react';
import './styles/historystyles.css'


function HistoryPage () {
    const [activeButton, setActiveButton] = useState('7 Days'); // state to track active button

    const handleClick = (button) => { // function to handle button click
        setActiveButton(button);
    }
    return (
        <>
            
            <UserNavBar />
            <h1>Your History</h1>
            <div className="container button-container" style={{padding: '5px'}}>
                <ButtonGroup aria-label="Basic example"> {/* use ButtonGroup component from react-bootstrap */}
                <Button
                    variant={activeButton === '7 Days' ? 'primary' : 'secondary'} // set variant based on active state
                    onClick={() => handleClick('7 Days')} // pass button name to handleClick function
                >
                    7 Days
                </Button>
                <Button
                    variant={activeButton === 'Month' ? 'primary' : 'secondary'}
                    onClick={() => handleClick('Month')}
                >
                    Month
                </Button>
                <Button
                    variant={activeButton === 'All' ? 'primary' : 'secondary'}
                    onClick={() => handleClick('All')}
                >
                    All
                </Button>
                </ButtonGroup>
            </div>
            
            <div className="container">
                <Table responsive>
                    <thead style={{backgroundColor : '#6ccca9', fontWeight: 'bold' }}>
                        <tr>
                            <th>Date</th>
                            <th>Heart Rate</th>
                            <th>Step #</th>
                            <th>Calories</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>01/01/2023</td>
                            <td>70 bpm</td>
                            <td>5000</td>
                            <td>200</td>
                        </tr>
                        <tr>
                            <td>01/02/2023</td>
                            <td>75 bpm</td>
                            <td>6000</td>
                            <td>250</td>
                        </tr>
                        <tr>
                            <td>01/03/2023</td>
                            <td>80 bpm</td>
                            <td>7000</td>
                            <td>300</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default HistoryPage;
