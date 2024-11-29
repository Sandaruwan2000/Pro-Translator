import React, { useEffect, useState } from 'react';
import Admindashboard from '../../components/Admindashboard';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio } from '@nextui-org/react';
import axios from 'axios'; // Correct axios import
import { GrMoreVertical, GrSearch } from 'react-icons/gr';
import { Link } from 'react-router-dom';

const colors = ["default", "primary", "secondary", "success", "warning", "danger"];

export default function Allpackage() {
  const [formData, setFormData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState('default');
  const [selectedPackage, setSelectedPackage] = useState(null); // Track selected package

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/backend/package/getAllpackage'); // Corrected axios usage
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

  const handleSelectPackage = (pack) => {
    setSelectedPackage(pack);
  };

  

  const deletePackage = async () => {
    if (selectedPackage) {
      try {
        await axios.delete(`/backend/package/deletePackage/${selectedPackage._id}`);
        setFormData(formData.filter((pack) => pack._id !== selectedPackage._id));
        alert('Successfully Deleted');
        setSelectedPackage(null);
      } catch (error) {
        console.error('Error deleting package:', error.message);
      }
    }
  };

  return (
    <div className='flex'>
      <div>
        <Admindashboard />
      </div>

      <div className="ml-auto flex-1 overflow-y-auto">

        <div>
            <h1 className='text-4xl font-bold font-serif p-3 ml-96 '>Packages</h1>
        </div>
        
        <div className='mt-10 w-96 p-3'>
          <input
          
            type="text"
            onChange={(e) => handleSearch(e)}
            value={query}
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          
        </div>

        
        {selectedPackage && (
          <div className="flex flex-col mt-4 p-4 border rounded-md ml-3 bg-gray-100 w-96">
            <div className="flex justify-between">
              <h3>Selected Package: {selectedPackage.name}</h3>
              <button
                className="px-2 py-1 bg-gray-300 rounded-full"
                onClick={() => setSelectedPackage(null)}
              >
                Close
              </button>
            </div>
            <div className="flex gap-2 mt-2">
            <Link to={`Updatepackage/${selectedPackage._id}`} >
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                
              >
                Edit
              </button>
              </Link>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={deletePackage}
              >
                Remove
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 mt-2 p-4">
          <Table
            color={selectedColor}
            selectionMode="single"
            aria-label="Package Table"
          >
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>DURATION</TableColumn>
              <TableColumn>DETAILS</TableColumn>
              <TableColumn>PRICE</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
              {formData.map((pack) => (
                <TableRow key={pack._id} >
                  <TableCell>{pack.name}</TableCell>
                  <TableCell>{pack.duration}</TableCell>
                  <TableCell>{pack.details}</TableCell>
                  <TableCell>{pack.price}</TableCell>
                  <TableCell><GrMoreVertical  onClick={() => handleSelectPackage(pack)}/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <RadioGroup
            label="Selection color"
            orientation="horizontal"
            value={selectedColor}
            onValueChange={setSelectedColor}
          >
            {colors.map((color) => (
              <Radio
                key={color}
                color={color}
                value={color}
                className="capitalize"
              >
                {color}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
