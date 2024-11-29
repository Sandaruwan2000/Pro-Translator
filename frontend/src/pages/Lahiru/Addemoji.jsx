import React, { useState } from 'react';
import axios from 'axios'; 
import Admindashboard from '../../components/Admindashboard';
import {Button} from "@nextui-org/react";
import { GrFingerPrint } from 'react-icons/gr';
import b1 from '../../Image/b1.jpg';
import { useNavigate } from 'react-router-dom';

const styles = {
  backgroundImage: `url(${b1})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '100%',
};


export default function Addemoji() {
  const [formData, setFormData] = useState({
    emoji: '',
    name: '',
  });

  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const emojiRegex = /^(?:[\p{Emoji_Presentation}\p{Emoji}\uFE0F][\p{Zs}\s]*){1}$/u;

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'emoji' && !emojiRegex.test(value)) {
      setError('Please enter a valid single emoji');
      return;
    } else {
      setError('');
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post('/backend/emoji/addemoji', formData);
      setSuccess('Emoji added successfully!');  
      setFormData({ emoji: '', name: '' }); 
         
    } catch (error) {
      setError(error.response?.data?.message || 'Error adding emoji');
    }
    
  };

  return (
    <div className="flex h-screen">
      
      <div>
        <Admindashboard />
      </div>

      
      <div className="ml-auto flex-1 overflow-y-auto p-8 bg-gray-50" >
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg h-96">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Add New Emoji
          </h2>

          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

         
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-5">
              <strong className="font-bold">Success! </strong>
              <span className="block sm:inline">{success}</span>
            </div>
          )}

        
          <form onSubmit={handleSubmit} className=''>
            {/* <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="emoji">
                Emoji
              </label>
              <input
                type="text"
                id="emoji"
                name="emoji"
                value={formData.emoji}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter an emoji"
              />
            
            </div> */}
            <input onChange={handleChange}  
            type='text'placeholder='Emoji' 
            id='emoji' 
            name='emoji' 
             className='border p-3 rounded-lg w-full bg-slate-900 text-white mb-7' 
             value={formData.emoji}   />

            {/* <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter a name for the emoji"
              />
            </div> */}

            <input onChange={handleChange} 
            type='text'  id='name'  name='name'
            className='border p-3 rounded-lg w-full bg-slate-900 text-white mb-7'
            placeholder="Enter a name for the emoji" 
            value={formData.name}  />


            
            {/* <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200"
            >
              Add Emoji
            </button> */}

            <Button color="success" endContent={<GrFingerPrint  className='hover:text-red-500'/>} type="submit"
            className="w-full h-12 hover:bg-purple-800 hover:text-white text-white font-bold py-2 px-4 rounded-md transition duration-200"
            >
        Add Emoji
          </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
