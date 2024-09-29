import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Userdashboard from '../components/Userdashboard';
import { useNavigate } from 'react-router-dom';

export default function Navigater() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { currentUser } = useSelector(state => state.user);
  const isAdmin = currentUser && currentUser.email === 'admin@gmail.com'; 
  const navigate=useNavigate();
  const handleMouseMove = (e) => {
    if (e.clientX < 50) {
      setIsSidebarVisible(true);
    } else if (e.clientX > 250) {
      setIsSidebarVisible(false);
    }
  };



  useEffect(() => {
   if(!isAdmin){

    navigate("/UserHome");
   }

  }, []);
  

  return (
    <div 
      className="flex h-screen"
      onMouseMove={handleMouseMove}  
    >
      
      {!isAdmin && (
        <div
          className={`fixed top-[52px] left-0 h-full transition-transform duration-300 ease-in-out transform ${
            isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Userdashboard />
        </div>
      )}
      
      
      <div className="flex-1 overflow-y-auto ml-auto">
        {/* Add Translation part here */}
        
      </div>
    </div>
  );
}
