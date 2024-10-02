import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Userdashboard from '../../components/Userdashboard';
import { GrClose } from 'react-icons/gr';

export default function Userfeedback() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5173/backend/feedback/customerview/${currentUser.email}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (currentUser?.email) {
      fetchUserData();
    }
  }, [currentUser.email]);

  const getEmojiForMood = (mood) => {
    switch (mood) {
      case 'happy':
        return '😊';
      case 'neutral':
        return '😐';
      case 'sad':
        return '😞';
      default:
        return '';
    }
  };

  const deleteStatus = async (id) => {
    try {
      await axios.delete(`/backend/feedback/deletefeedback/${id}`);
      setFormData(formData.filter((feedback) => feedback._id !== id));
      alert('Successfully Deleted');
    } catch (error) {
      console.error('Error deleting feedback:', error.message);
    }
  };

  const handleFeedbackClick = (id) => {
    navigate(`Updatefeedback/${id}`); // Navigate to the UpdateFeedback page
  };

  return (
    <div className="flex">
      <div>
        <Userdashboard />
      </div>

      <div className="ml-auto flex-1 overflow-y-auto">
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="w-full max-w-5xl p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Your Feedbacks</h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {formData.map((feedback) => (
                <div
                  key={feedback._id}
                  onClick={() => handleFeedbackClick(feedback._id)} 
                  className="relative p-4 bg-slate-700 text-white border rounded-lg shadow-md hover:bg-gray-100 hover:text-black transition duration-200 cursor-pointer" // Make the div clickable
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      deleteStatus(feedback._id);
                    }}
                    className="absolute top-2 right-2 p-1 text-white hover:text-red-500"
                  >
                    <GrClose />
                  </button>

                  <p className="text-lg">
                    <span className="text-red-500">Mood:</span> {getEmojiForMood(feedback.mood)}
                  </p>
                  <p className="text-lg">
                    <span className="text-red-500">Quality:</span> {feedback.quality}
                  </p>
                  <p className="text-lg">
                    <span className="text-red-500">Features:</span> {feedback.features}
                  </p>
                  <p className="text-lg">
                    <span className="text-red-500">Feedback:</span> {feedback.feedback}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
