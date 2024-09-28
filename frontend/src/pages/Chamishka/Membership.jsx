import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Userdashboard from '../../components/Userdashboard';

export default function Membership() {
  const [formData, setFormData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/backend/package/getAllpackage');
        setFormData(res.data);
        setFilterData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching packages:', error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const getSearch = e.target.value.toLowerCase();

    if (getSearch.length > 0) {
      const searchdata = filterData.filter((item) =>
        item.name.toLowerCase().includes(getSearch)
      );
      setFormData(searchdata);
    } else {
      setFormData(filterData);
    }

    setQuery(getSearch);
  };

  return (
    <div className="flex">
      <div>
        <Userdashboard />
      </div>

      <div className="ml-auto flex-1 overflow-y-auto">
        <div>
          <h1 className="text-3xl font-bold mb-6 text-center">Membership Packages</h1>
        </div>
        <div className="w-full max-w-5xl p-6">
          <div className="mb-6 w-96 mx-auto">
            <input
              type="text"
              onChange={handleSearch}
              value={query}
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formData.map((pack) => (
              <div key={pack._id} className="p-6 border rounded-lg shadow-md transition duration-300 hover:shadow-lg">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-blue-500">{pack.name}</h3>
                  <p className="text-4xl font-bold mt-4">${pack.price}</p>
                  <p className="text-gray-500">per month</p>
                </div>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center text-gray-700">
                    <span className="material-icons text-green-500 mr-2">Description</span> {pack.details}
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="material-icons text-green-500 mr-2">Duration</span> {pack.duration} months
                  </li>
                  {/* Add more details as needed */}
                </ul>
                <button className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
                  Purchase
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
