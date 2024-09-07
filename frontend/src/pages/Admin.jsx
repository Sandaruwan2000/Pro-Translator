import React from 'react';
import User from '../components/User';
import Admindashboard from '../components/Admindashboard';

export default function Admin() {
  return (
    <div className='flex' >
      
      <div  >
        <Admindashboard />
      </div>

      
      <div className="ml-auto flex-1 overflow-y-auto ">
        <User />
      </div>
    </div>
  );
}
