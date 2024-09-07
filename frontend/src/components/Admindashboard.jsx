
import React, { useState } from 'react';
import { GrAd, GrAddCircle, GrAppsRounded, GrChapterAdd, GrGroup, GrMenu, GrClose } from "react-icons/gr";
import { Link } from 'react-router-dom';

export default function Admindashboard() {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='flex h-screen'>
      
      
      <div className='md:hidden bg-black p-4 w-full h-10'>
        <button onClick={toggleSidebar} className="text-white">
          <GrMenu className="text-xl" />
        </button>
      </div>

      
      <div className={`fixed top-0 left-0 w-56 bg-slate-900 h-full transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative`}>
        <div className="font-bold text-white p-3 flex justify-between items-center">
          <span className='flex items-center'>
            <GrMenu  className="mr-2 my-1.5   text-large   text-white  hover:text-red-500" />
            <span className='ml-2 text-large my-1'>Dashboard</span>
          </span>
          <button className="md:hidden text-white text-xl" onClick={toggleSidebar}>
            <GrClose />
          </button>
        </div>

        
        <ul className='font-bold'>
          <Link to="/">
            <li className="py-2 p-3 hover:bg-white hover:text-black text-white rounded-md cursor-pointer flex items-center">
              <GrAddCircle className="mr-2 my-1 me-4 text-large text-red-500  hover:text-red-500" />Add Emoji
            </li>
          </Link>
          <Link to="/">
            <li className="py-2 p-3 hover:bg-white hover:text-black text-white rounded-md cursor-pointer flex items-center">
              <GrAppsRounded className="mr-2 my-1 me-4 text-large text-red-500  hover:text-red-500" />Emoji
            </li>
          </Link>
          <Link to="/">
            <li className="py-2 p-3 hover:bg-white hover:text-black text-white rounded-md cursor-pointer flex items-center">
              <GrChapterAdd className="mr-2 my-1 me-4 text-large text-red-500  hover:text-red-500" />Add Package
            </li>
          </Link>
          <Link to="/">
            <li className="py-2 p-3 hover:bg-white hover:text-black text-white rounded-md cursor-pointer flex items-center">
              <GrAd className="mr-2 my-1 me-4 text-large text-red-500  hover:text-red-500" />Package
            </li>
          </Link>
          <Link to="/">
            <li className="py-2 p-3 hover:bg-white hover:text-black text-white rounded-md cursor-pointer flex items-center">
              <GrGroup className="mr-2 my-1 me-4 text-large text-red-500  hover:text-red-500" />Feedback
            </li>
          </Link>
        </ul>
      </div>

     
    </div>
  );
}
