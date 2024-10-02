import React, { useEffect, useState } from 'react';
import Userdashboard from '../../components/Userdashboard';
import axios from 'axios';
import { GrMoreVertical } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";

export default function History() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10; // Adjust items per page if needed
  const pages = Math.ceil(formData.length / itemsPerPage);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString(); 
  const dayName = currentDate.toLocaleDateString(undefined, { weekday: 'long' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/backend/history/historyview/${currentUser.email}`);
        const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setFormData(sortedData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (currentUser.email) {
      fetchUserData();
    }
  }, [currentUser.email]);

  const deleteStatus = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://localhost:5173/backend/history/deletehistory/${id}`);
        setFormData(formData.filter(item => item._id !== id));
      } catch (error) {
        console.error('Error deleting status:', error);
      }
    }
  };

  const getKeyValue = (item, key) => {
    switch (key) {
      case 'word':
        return item.word;
      case 'meaning':
        return item.meaning;
      case 'createdAt':
        return new Date(item.createdAt).toLocaleDateString();
      default:
        return '';
    }
  };

  // Pagination logic
  const paginatedData = formData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className='flex' style={{height:'100%', background:"#0f172a"}}>
      <Userdashboard />
      
      <div className="ml-auto flex-1 p-6 bg-gray-100 min-h-screen">
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl font-bold text-gray-800'>History</h1>
        </div>

        <p className="text-2xl text-gray-600">
          Today is {dayName}, {formattedDate}
        </p>

        <div className="bg-slate-200 shadow-md rounded-lg overflow-hidden m-3">
          <Table 
            aria-label="Example table with client-side pagination "
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
            classNames={{
              wrapper: "min-h-[222px]",
            }}
          >
            <TableHeader>
              <TableColumn key="word" className='bg-black text-white'>WORD</TableColumn>
              <TableColumn key="meaning" className='bg-black text-white'>MEANING</TableColumn>
              <TableColumn key="createdAt" className='bg-black text-white'>CREATED AT</TableColumn>
              <TableColumn key="action" className='bg-black text-white'>ACTION</TableColumn>
            </TableHeader>

            <TableBody items={paginatedData}>
              {(item) => (
                <TableRow key={item._id}>
                  {(columnKey) => (
                    <TableCell>
                      {columnKey === 'action' ? (
                        <button
                          className='text-slate-500 hover:text-red-700 transition-colors duration-300'
                          onClick={() => deleteStatus(item._id)}
                        >
                          <GrMoreVertical />
                        </button>
                      ) : (
                        getKeyValue(item, columnKey)
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
