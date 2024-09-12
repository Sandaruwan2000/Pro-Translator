import React, { useEffect, useState } from 'react';
import Admindashboard from '../../components/Admindashboard';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, Spinner } from '@nextui-org/react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { GrClose, GrEdit, GrSearch } from 'react-icons/gr';
import {Input} from "@nextui-org/react";

export default function Allemoji() {
  const [formData, setFormData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState('');

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/backend/emoji/getAllemoji');
        setFormData(res.data);
        setFilterData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching emojis:', error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const getSearch = e.target.value;

    if (getSearch.length > 0) {
        const searchdata = formData.filter((item) => item.name.toLowerCase().includes(getSearch));
        setFormData(searchdata);
    } else {
        setFormData(filterData);
    }

    setQuery(getSearch);
};

  const deleteStatus = async (id) => {
    try {
      await axios.delete(`/backend/emoji/deleteEmoji/${id}`);
      setFormData(formData.filter((emoji) => emoji._id !== id));
      alert('Successfully Deleted');
    } catch (error) {
      console.error('Error deleting emoji:', error.message);
    }
  };

  const paginatedData = formData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(formData.length / itemsPerPage);

  return (
    <div className="flex">
      <Admindashboard />

      <div className="ml-auto flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Emojis</h1>

        {/* <div>
              <input
                 type="text"
                 placeholder="Search..."
                 value={query}
                 onChange={(e) => handleSearch(e)}
                 style={{ padding: '5px', border: '1px solid ' }}
                 className="border-2 my-4 border-gray-300 px-4 py-2 w-36 bg-transparent text-black font-semibold"
                />
        </div> */}

        <div className="w-[340px] h-[60px] px-8 rounded-2xl flex justify-center items-center bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg mb-5">
      <Input className=''
        label="Search"
        onChange={(e) => handleSearch(e)}
        value={query}
        isClearable
        radius="lg"
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Type to search..."
        startContent={
          <GrSearch  className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />
    </div>

        <Table
          aria-label="Emojis table with pagination"
          isHeaderSticky
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                page={page}
                total={totalPages}
                onChange={(newPage) => setPage(newPage)}
                color="primary"
                showControls
                showShadow
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader>
            <TableColumn key="emoji" className='bg-gray-900 text-white text-sm'>Emoji</TableColumn>
            <TableColumn key="name" className='bg-gray-900 text-white text-sm'>Name</TableColumn>
            <TableColumn key="edit" className='bg-gray-900 text-white text-sm'>Edit</TableColumn>
            <TableColumn key="delete" className='bg-gray-900 text-white text-sm'>Delete</TableColumn>
          </TableHeader>

          <TableBody
            isLoading={isLoading}
            loadingContent={<Spinner label="Loading..." />}
            items={paginatedData}
          >
            {(emoji) => (
              <TableRow key={emoji._id}>
                <TableCell>{emoji.emoji}</TableCell>
                <TableCell>{emoji.name}</TableCell>
                <TableCell>
                  <Link to={`updateemoji/${emoji._id}`} title="Update status">
                    <GrEdit  className="text-green-800" />
                  </Link>
                </TableCell>
                <TableCell>
                  <button onClick={() => deleteStatus(emoji._id)}>
                    <GrClose  className="text-red-600" title='Delete' />
                  </button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
