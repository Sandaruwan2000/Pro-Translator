import React, { useState } from 'react';
import logoimage from '../../Image/p.png';
import Admindashboard from '../../components/Admindashboard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Addpackage() {
  // Form state
  const [formData, setFormData] = useState({
    PkgCode:'',
    name: '',
    duration: '',
    details: '',
    price: '',
  });

  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/backend/package/addpackage', formData);
      setSuccess('Package added successfully!');
      setError('');
      // Reset the form after submission
      setFormData({
        PkgCode:'',
        name: '',
        duration: '',
        details: '',
        price: '',
      });
    } catch (error) {
      setSuccess('');
      setError(error.response?.data?.message || 'Error adding package');
    }
  };

  return (
    <div className='flex'>
      <div>
        <Admindashboard />
      </div>

      <div className="ml-auto flex-1 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white rounded-lg shadow-lg flex w-3/4">
            <div className="w-1/2 p-10 rounded-l-lg flex flex-col justify-center" style={{ background: 'linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%)' }}>
              <div>
                <img src={logoimage} alt="logo" style={{ position: 'relative', top: '-50px', width: '300px', height: '300px' }} />
              </div>
            </div>

            <div className="w-1/2 p-10 flex flex-col justify-center">
              <h2 className="text-3xl font-semibold mb-6">Create a Package</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700">Package Code</label>
                  <input
                    type="text"
                    id="PkgCode"
                    value={formData.PkgCode}
                    onChange={handleChange}
                    placeholder="Enter package Code"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Package Type</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter package type"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration</label>
                  <input
                    type="text"
                    id="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Enter duration In Months"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Details</label>
                  <input
                    type="text"
                    id="details"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Enter package details"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="text"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter package price"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}

                <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                  Create Package
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
