import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button, ListGroup } from 'react-bootstrap';

const GlossaryList = ({ userId, onEdit, onDelete }) => {
  const [glossaryEntries, setGlossaryEntries] = useState([]);

  useEffect(() => {
    const fetchGlossaryEntries = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/glossery/list/${userId}`);
        setGlossaryEntries(response.data.glossaryEntries);
      } catch (error) {
        console.error("Error fetching glossary entries:", error);
      }
    };

    fetchGlossaryEntries();
  }, [userId]); 

  return (
    <ListGroup>
      {glossaryEntries.map(entry => (
        <ListGroup.Item key={entry._id}>
          <div className="d-flex justify-content-between align-items-center">
            <span>
              {entry.sourceLang} - {entry.targetLang}<br />
              {entry.term} &gt; {entry.translatedTerm}
            </span>
            <div>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => onEdit(entry)}
              >
                <FaEdit />
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                className="ms-2"
                onClick={() => onDelete(entry._id)}
              >
                <FaTrash />
              </Button>
            </div>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default GlossaryList;
