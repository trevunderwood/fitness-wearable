import { useState, useEffect } from 'react';
import UserNavBar from "../../components/UserNavBar";
import { useAuth } from "../../AuthContext";


function RecPage() {

    const [exercises, setExercises] = useState(null);
    const { currentUser } = useAuth();
    const fetchExercise = async (UserID) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/recommend-exercise/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ UserID }),
            });

            console.log("Data from API: ",data);
            const data = await response.json();

            if (response.ok) {
                return data.result;
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Error fetching Exercises:', error);
            alert(error);
        }
    };

    useEffect(() => {
        
        const UserID = currentUser.uid;
        fetchExercise(UserID).then(result => setExercises(result)); // Replace with the actual user ID
    }, []);

    return (
        <>
            <UserNavBar></UserNavBar>

            <div className="container">
                <h1>Recommendations</h1>
                {Array.isArray(exercises) ? (
                    <ul>
                        {exercises.map((exercise, index) => (
                            <li key={index}>{exercise.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>{exercises}</p>
                )}
            </div>
        </>
    );
}

export default RecPage;
