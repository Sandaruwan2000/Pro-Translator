import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Userdashboard from '../components/Userdashboard';

export default function Home() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { currentUser } = useSelector(state => state.user);
  const isAdmin = currentUser && currentUser.email === 'admin@gmail.com'; 

  const handleMouseMove = (e) => {
    if (e.clientX < 50) {
      setIsSidebarVisible(true);
    } else if (e.clientX > 250) {
      setIsSidebarVisible(false);
    }
  };

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
