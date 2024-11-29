import React, { useEffect, useState } from 'react'
import Admindashboard from '../../components/Admindashboard'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function UpdateEmoji() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    emoji: '',
    name: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:5173/backend/emoji/oneEmoji/${id}`)
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
      await axios.put(`/backend/emoji/updateEmoji/${id}`, formData);
      alert('Emoji update successful');
      navigate('/allemoji');
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

      
      <div className="ml-auto flex-1 overflow-y-auto ">
       <div className='mx-auto'>
       <h1 className='text-3xl text-center font-bold my-5 text-red-500'>Update Emoji</h1>

       <form onSubmit={handleEdit} className='flex flex-col gap-4 p-5 ml-80'>

      <input onChange={handleChange}  type='text'placeholder='Emoji' id='emoji'  className='border p-3 rounded-lg w-96 bg-slate-900 text-white' defaultValue={formData.emoji} disabled  />

      <input onChange={handleChange} type='text'  id='name'  className='border p-3 rounded-lg w-96 bg-slate-900 text-white' defaultValue={formData.name}  />

      <button type='submit'className='bg-gradient-to-r  w-96 from-purple-600 to-blue-600 text-white border-black rounded-lg p-3 uppercase text-xl font-bold hover:opacity-90 disabled:opacity-80' >

      Update
      </button>
        
        </form>
        
       </div>

      </div>
    </div>
  )
}
