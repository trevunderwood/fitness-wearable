import './App.css';
import HomePage from './pages/HomePage';
import SignPage from './pages/SignPage'
import RegisterPage from './pages/RegisterPage';
import UserHome from './pages/UserPages/UserHome';
import RecPage from './pages/UserPages/RecPage';
import FoodPage from './pages/UserPages/FoodPage';
import ProfilePage from './pages/UserPages/ProfilePage';
import HistoryPage from './pages/UserPages/HIstoryPage';
import PersonalRegisterPage from './pages/PersonalRegisterPage';
import EditProfilePage from './pages/UserPages/EditProfilePage';



import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path ="/" element={<HomePage />}></Route>
            <Route path ="/sign-in" element={<SignPage />}></Route>
            <Route path ="/register" element={<RegisterPage/>}></Route>
            <Route path ="/user-home" element={<UserHome/>}></Route>
            <Route path ="/personal-register" element={<PersonalRegisterPage/>}></Route>


            <Route path ="/reccomendations" element={<RecPage/>}></Route>
            <Route path ="/food" element={<FoodPage/>}></Route>
            <Route path ="/profile" element={<ProfilePage/>}></Route>
            <Route path ="/history" element={<HistoryPage/>}></Route>
            <Route path ="/edit-profile" element={<EditProfilePage/>}></Route>
            

        </Routes>
      </BrowserRouter>

    </div>
    

  );
}

export default App;
