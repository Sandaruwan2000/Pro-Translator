
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Hearder from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import User from './components/User';
import Navigater from './pages/Navigater';
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
import GlobeDemo from './pages/Lahiru/GlobeDemo';
import GlobeComponent from './components/GlobeComponent';
import Addpackage from './pages/Chamishka/Addpackgae';
import Allpackage from './pages/Chamishka/Allpackage';
import Updatepackage from './pages/Chamishka/Updatepackage';
import AddFeedback from './pages/Chamishka/AddFeedback';
import Allfeedback from './pages/Chamishka/Allfeedback';
import Userfeedback from './pages/Chamishka/Userfeedback';
import UpdateFeedback from './pages/Chamishka/UpdateFeedback';
import NavBar from './components/Accsesories/Navbar/Navbar';

/*Import layouts*/
import UserHomeLayout from './pages/Shachiru/Layouts/UserHomeLayout';
import Otherlayouts from './pages/Shachiru/Layouts/OtherLayouts';


/*Shachiru*/
import Home from './pages/Shachiru/UserHome/Pages/Home/Home';
import Translator from './pages/Shachiru/UserHome/Pages/Home/Translate';
import Card from './pages/Shachiru/UserHome/Pages/checkout/Card';
import Recipt from './pages/Shachiru/UserHome/Pages/checkout/Recipt';
import UserAgree from './pages/Shachiru/UserHome/Pages/checkout/UserAgree';
import Checkout from './pages/Shachiru/UserHome/Pages/checkout/Checkout';
import MyOrders from './pages/Shachiru/UserHome/Pages/Myorders';

/*****Supun***** */
import FavoritePage from './pages/Shachiru/UserHome/Pages/Home/FavoritePage';
import GlossaryPage from './pages/Shachiru/UserHome/Pages/Glossery/GlossaryPage';


/********************** */

export default function App() {
  return (
    <BrowserRouter>


     <Routes>
        {/*-------------------------Home layout--------------------------*/}

        <Route path="/UserHome" element={<UserHomeLayout />} >

            <Route index element={<Home/>}/>
            <Route path='/UserHome/translater' element={<Translator/>}/>
            <Route path='/UserHome/favorites' element={<FavoritePage/>}/>
            <Route path='/UserHome/glossery' element={<GlossaryPage/>}/>
            <Route path='/UserHome/checkout/recipt/:id' element={<Recipt/>}/>
 <Route path='/UserHome/checkout/card/:id' element={<Card/>}/>
 <Route path='/UserHome/checkout/terms/:id' element={<UserAgree/>}/>
 <Route path='/UserHome/checkout/:id' element={<Checkout/>}/>
          
          
           
       
            



        </Route>
       


        {/*-------------------------Home layout--------------------------*/}
       

        {/*-------------------------Other layout--------------------------*/}
        <Route path="/" element={<Otherlayouts />} >
    
       
        <Route index element={<Navigater />} />
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
        <Route path="/fe" element={<GlobeDemo/>} />
        <Route path="/GlobeComponent" element={<GlobeComponent/>} />
        <Route path="/Addpackage" element={<Addpackage/>} />
        <Route path="/Allpackage" element={<Allpackage/>} />
        <Route path="/Allpackage/Updatepackage/:id" element={<Updatepackage/>} />
        <Route path="/AddFeedback" element={<AddFeedback/>} />
        <Route path="/Allfeedback" element={<Allfeedback/>} />
        <Route path="/Userfeedback" element={<Userfeedback/>} />
        <Route path="/Userfeedback/UpdateFeedback/:id" element={<UpdateFeedback/>} />



</Route>





       

        {/*-------------------------Other layout--------------------------*/}
      


     </Routes>
     </BrowserRouter>
  )
}
