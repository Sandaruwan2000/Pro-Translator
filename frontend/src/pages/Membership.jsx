import React, { useState } from 'react'
import Userdashboard from '../components/Userdashboard';

export default function Membership() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

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
        
        <div
          className={`fixed top-13 left-0 h-full transition-transform duration-300 ease-in-out transform ${
            isSidebarVisible ? 'translate-x-0' : '-translate-x-full '
          }`}
           
        >
          <Userdashboard />
        </div>
  
        
        <div className="flex-1 overflow-y-auto ml-auto">
          {/* Add Membership part */}
          
        </div>
      </div>
    );
  }
  
