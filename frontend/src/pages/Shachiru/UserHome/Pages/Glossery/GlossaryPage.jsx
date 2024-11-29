import React, { useState, useCallback } from "react";
import axios from "axios";
import AddGlossary from "./AddGlossary";
import GlossaryList from "./GlossaryList"
import { useNavigate } from "react-router-dom";

const GlossaryPage = () => {
  const [selectedEntry, setSelectedEntry] = useState(null); // Store selected entry for editing
  const [refreshKey, setRefreshKey] = useState(0); // Key to trigger re-fetch
  const navigate = useNavigate();

  const handleSuccess = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1); // Trigger re-fetch in GlossaryList
    setSelectedEntry(null); // Clear selected entry after update
    navigate('/UserHome/glossery'); 
  }, [navigate]);

  const handleEdit = (entry) => {
    setSelectedEntry(entry); // Set the selected entry for editing
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/glossery/delete/${id}`);
      alert("Glossary entry deleted successfully!");
      setRefreshKey(prevKey => prevKey + 1); // Trigger re-fetch in GlossaryList
    } catch (error) {
      console.error("Error deleting glossary entry:", error);
      alert("Failed to delete glossary entry.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex">
        <div className="w-50 pe-3">
          <h2>Glossary Entries</h2>
          <GlossaryList key={refreshKey} userId={1} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        <div className="w-50">
          <h2>{selectedEntry ? "Edit Glossary Entry" : "Add Glossary Entry"}</h2>
          <AddGlossary onSuccess={handleSuccess} selectedEntry={selectedEntry} />
        </div>
      </div>
    </div>
  );
};

export default GlossaryPage;
