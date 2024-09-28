import React, { useEffect, useState } from 'react';
import Userdashboard from '../../components/Userdashboard';
import axios from 'axios';
import { FaDownload } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jsPdf from 'jspdf';
import 'jspdf-autotable';
import logo from '../../Image/logo.png';
import html2canvas from 'html2canvas';
import {Button} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue} from "@nextui-org/react";
import { GrDownload } from 'react-icons/gr';


export default function Feature() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [wordCount, setWordCount] = useState({});
  const [wordsWithFiveOrMore, setWordsWithFiveOrMore] = useState([]);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/backend/history/historyview/${currentUser.email}`);
        const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const currentDate = getCurrentDate();
        const todayData = sortedData.filter(item => item.createdAt.startsWith(currentDate));
        setFormData(todayData);

        const wordFrequency = {};
        todayData.forEach(item => {
          wordFrequency[item.word] = (wordFrequency[item.word] || 0) + 1;
        });
        setWordCount(wordFrequency);

        const frequentWords = Object.keys(wordFrequency).filter(word => wordFrequency[word] >= 5);
        setWordsWithFiveOrMore(frequentWords);
        

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (currentUser?.email) {
      fetchUserData();
    }
  }, [currentUser.email]);

  const handleDownload = () => {
    const input = document.getElementById('tableToDownload');
  
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPdf();
  
      
      pdf.text('Remember List', 90, 10);
  
      const imgWidth = 180;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      let position = 20; 
      let heightLeft = imgHeight;
  
      
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      
      const logoImg = new Image();
      logoImg.src = logo;
  
      logoImg.onload = () => {
        const logoWidth = 50;
        const logoHeight = (logoImg.height * logoWidth) / logoImg.width;
  
        const logoPositionY = pdf.internal.pageSize.height - logoHeight - 100; 
        const centerX = (pdf.internal.pageSize.width - logoWidth) / 2;
  
        pdf.addImage(logoImg, 'PNG', centerX, logoPositionY, logoWidth, logoHeight);
        
        pdf.save('Remember_List_with_Logo.pdf');
      };
    });
  };
  

  return (
    <div className='flex h-screen bg-gray-900'>
      <div className='w-64'>
        <Userdashboard />
      </div>

      <div className='flex-1 p-6 bg-gray-100'>
        <div className='mb-4 flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-gray-800'>Today Remember</h1>
        </div>

        <div className='ml-96'>
          <Button color="success" variant="ghost"
            className='download-btn w-36 ml-96 hover:border-red-500'
            onClick={handleDownload}
           
          >
            <div className='flex flex-row font-bold text-black hover:text-white '>
              Report <GrDownload  className='my-1 m-3 text-white hover:text-white ' />
            </div>
          </Button>
        </div>
        

        {wordsWithFiveOrMore.length > 0 && (
          <div className='mb-4 ml-40'>
            <ul className='list-disc pl-6'>
              {wordsWithFiveOrMore.map((word) => (
                <li key={word} className='text-lg text-red-500'>
                  {`${word} (${wordCount[word]} times)`}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div id="tableToDownload" className='bg-white shadow-md rounded-lg overflow-hidden w-4/6 ml-40 flex'>
          <table className='w-full border-collapse'>
            <thead className='bg-gray-900 text-white'>
              <tr>
                <th className='border-b p-4 text-left'>Word</th>
                <th className='border-b p-4 text-left'>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(new Set(formData.filter(item => wordCount[item.word] >= 5).map(item => item.word)))
                .map(word => {
                  const historyItem = formData.find(item => item.word === word);
                  return (
                    <tr key={historyItem._id} className='hover:bg-gray-50'>
                      <td className='border-b p-4'>{historyItem.word}</td>
                      <td className='border-b p-4'>{historyItem.meaning}</td>
                    </tr>
                  );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
