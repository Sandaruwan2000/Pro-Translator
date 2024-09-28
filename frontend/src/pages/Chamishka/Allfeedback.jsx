import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import Admindashboard from "../../components/Admindashboard";
import axios from "axios";

export default function Allfeedback() {
  const [formData, setFormData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/backend/feedback/getAllfeedback");
        setFormData(res.data);
        setFilterData(res.data);
      } catch (error) {
        console.error("Error fetching feedback:", error.message);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const getSearch = e.target.value.toLowerCase();
    if (getSearch.length > 0) {
      const searchdata = filterData.filter((item) =>
        item.mood.toLowerCase().includes(getSearch)
      );
      setFormData(searchdata);
    } else {
      setFormData(filterData);
    }
    setQuery(getSearch);
  };

  const getEmojiForMood = (mood) => {
    switch (mood) {
      case "happy":
        return "😊";
      case "neutral":
        return "😐";
      case "sad":
        return "😞";
      default:
        return "";
    }
  };

  

  return (
    <div className="flex">
      <div>
        <Admindashboard />
      </div>

      <div className="ml-auto flex-1 overflow-y-auto">
        <div className="mt-10 w-96 p-3 " >
          <input
            type="text"
            onChange={(e) => handleSearch(e)}
            value={query}
            placeholder="Search mood..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <div className="flex flex-row mt-3 gap-3">
            <h1 className="" title="happy">😊</h1>
            <h1 className="" title="neutral">😐</h1>
            <h1 className="" title="sad">😞</h1>
          </div>
        </div>

        <div className="p-3">
          <Table removeWrapper aria-label="Feedback Table">
            <TableHeader >
              <TableColumn className="bg-slate-700 text-white">Email</TableColumn>
              <TableColumn className="bg-slate-700 text-white">Mood</TableColumn>
              <TableColumn className="bg-slate-700 text-white">Quality</TableColumn>
              <TableColumn className="bg-slate-700 text-white">Features</TableColumn>
              <TableColumn className="bg-slate-700 text-white">Feedback</TableColumn>
            </TableHeader>
            <TableBody>
              {formData.map((feedback) => (
                <TableRow key={feedback._id}>
                  <TableCell>{feedback.email}</TableCell>
                  <TableCell>{getEmojiForMood(feedback.mood)}</TableCell>
                  <TableCell>{feedback.quality}</TableCell>
                  <TableCell>{feedback.features}</TableCell>
                  <TableCell>{feedback.feedback}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
