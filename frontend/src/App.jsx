
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Hearder from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import User from './components/User';
import Home from './pages/Home';
import Admindashboard from './components/Admindashboard';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Userdashboard from './components/Userdashboard';
import Membership from './pages/Chamishka/Membership';
import Addemoji from './pages/Lahiru/Addemoji';
import Allemoji from './pages/Lahiru/Allemoji';
import UpdateEmoji from './pages/Lahiru/UpdateEmoji';
import Emojitranslator from './pages/Lahiru/Emojitranslator';
import History from './pages/Lahiru/History';
import Feature from './pages/Lahiru/Feature';



export default function App() {
  return (
    <BrowserRouter>

    <Hearder/>
     <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/user" element={<User/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/admindashboard" element={<Admindashboard/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/userdashboard" element={<Userdashboard/>} />
        <Route path="/Membership" element={<Membership/>} />
        <Route path="/addemoji" element={<Addemoji/>} />
        <Route path="/allemoji" element={<Allemoji/>} />
        <Route path="/allemoji/updateemoji/:id" element={<UpdateEmoji/>} />
        <Route path="/emojitranslator" element={<Emojitranslator/>} />
        <Route path="/history" element={<History/>} />
        <Route path="/feature" element={<Feature/>} />
     </Routes>
     </BrowserRouter>
  )
}
