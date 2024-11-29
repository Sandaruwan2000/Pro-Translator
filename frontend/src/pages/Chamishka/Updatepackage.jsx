import React, { useEffect, useState } from 'react'
import Admindashboard from '../../components/Admindashboard'
import logoimage from '../../Image/up1.png';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Updatepackage() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        duration: '',
        details: '',
        price: ''
      });

    useEffect(() => {
        axios.get(`http://localhost:5173/backend/package/onepackage/${id}`)
          .then((res) => {
             setFormData(res.data);
          })
          .catch((error) => {
              console.log(error);
          });
      }, [id]);

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };


      const handleEdit = async (e) => {
        e.preventDefault();
        try {
          await axios.put(`/backend/package/updatePackage/${id}`, formData);
          alert('Package update successful');
          navigate('/Allpackage');
        } catch (err) {
          console.error(err);
          alert('Error updating emoji');
        }
      };
    

  return (
    <div className='flex' >
      
      <div  >
        <Admindashboard />
      </div>

      
      <div className="ml-auto flex-1 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white rounded-lg shadow-lg flex w-3/4">
            <div className="w-1/2 p-10 rounded-l-lg flex flex-col justify-center" style={{ background: 'linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%)' }}>
              <div>
                <img src={logoimage} alt="logo" style={{ position: 'relative', top: '-20px', width: '300px', height: '300px' }} />
              </div>
            </div>

            <div className="w-1/2 p-10 flex flex-col justify-center">
              <h2 className="text-3xl font-semibold mb-6">Update a Package</h2>
              <form onSubmit={handleEdit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Package Type</label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={formData.name}
                    onChange={handleChange}
                    
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration</label>
                  <input
                    type="text"
                    id="duration"
                    defaultValue={formData.duration}
                    onChange={handleChange}
                    
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Details</label>
                  <input
                    type="text"
                    id="details"
                    defaultValue={formData.details}
                    onChange={handleChange}
                    
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="text"
                    id="price"
                    defaultValue={formData.price}
                    onChange={handleChange}
                   
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                

                <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                  Update Package
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
