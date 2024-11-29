import React, { useState } from 'react';
import axios from 'axios';
import Userdashboard from '../../components/Userdashboard';
import { useSelector } from 'react-redux';

export default function AddFeedback() {
  // Get the current user from Redux state
  const { currentUser } = useSelector((state) => state.user);
  const email = currentUser?.email || ''; // Ensure email exists

  // Initialize form state
  const [formData, setFormData] = useState({
    email: email,  // Correctly set the email from currentUser
    mood: '',
    quality: '',
    features: [],
    feedback: '',
  });

  const [success, setSuccess] = useState('');  // Define success state
  const [error, setError] = useState('');      // Define error state

  // Handle feature checkbox changes
  const handleFeatureChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        features: [...prevData.features, value],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        features: prevData.features.filter((feature) => feature !== value),
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/backend/feedback/addfeedback', formData); // Use relative path
      setSuccess('Feedback added successfully!');
      setError('');

      // Reset the form after submission, keeping the email
      setFormData({
        email: formData.email,
        mood: '',
        quality: '',
        features: [],
        feedback: '',
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Failed to submit feedback');
    }
  };

  return (
    <div className="flex">
      <div className="bg-slate-900">
        <Userdashboard />
      </div>

      <div className="ml-auto flex-1 overflow-y-auto">
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-xl font-bold mb-4 text-center">Feedback</h1>

            {/* Display success or error messages */}
            {success && <div className="bg-green-100 text-green-800 p-2 mb-4">{success}</div>}
            {error && <div className="bg-red-100 text-red-800 p-2 mb-4">{error}</div>}

            {/* Mood Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">How would you describe your mood after using our product for the first time?</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`p-2 ${formData.mood === 'happy' ? 'bg-green-200' : ''}`}
                  onClick={() => setFormData({ ...formData, mood: 'happy' })}
                >
                  😊
                </button>
                <button
                  type="button"
                  className={`p-2 ${formData.mood === 'neutral' ? 'bg-yellow-200' : ''}`}
                  onClick={() => setFormData({ ...formData, mood: 'neutral' })}
                >
                  😐
                </button>
                <button
                  type="button"
                  className={`p-2 ${formData.mood === 'sad' ? 'bg-red-200' : ''}`}
                  onClick={() => setFormData({ ...formData, mood: 'sad' })}
                >
                  😞
                </button>
              </div>
            </div>

            {/* Quality Rating */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">How would you rate the quality of our product?</label>
              <div className="flex space-x-4">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    type="button"
                    key={num}
                    className={`p-2 rounded-full border ${formData.quality === num ? 'bg-purple-200' : 'border-gray-300'}`}
                    onClick={() => setFormData({ ...formData, quality: num })}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Features Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Which feature is the best for you?</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Integration options and tools"
                    checked={formData.features.includes('Integration options and tools')}
                    onChange={handleFeatureChange}
                    className="form-checkbox text-indigo-600"
                  />
                  <span className="ml-2">Integration options and tools</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="The advanced search functionality"
                    checked={formData.features.includes('The advanced search functionality')}
                    onChange={handleFeatureChange}
                    className="form-checkbox text-indigo-600"
                  />
                  <span className="ml-2">The advanced search functionality</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="The customizable settings"
                    checked={formData.features.includes('The customizable settings')}
                    onChange={handleFeatureChange}
                    className="form-checkbox text-indigo-600"
                  />
                  <span className="ml-2">The customizable settings</span>
                </label>
              </div>
            </div>

            {/* Feedback Text Area */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your feedback</label>
              <textarea
                value={formData.feedback}
                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="4"
                placeholder="Anything you'd like to add? Your input is valuable to us."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
            >
              Send Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
