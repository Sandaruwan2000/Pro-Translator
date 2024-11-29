import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LanguagesSelect from "./LanguagesSelect";

const AddGlossary = ({ onSuccess, selectedEntry }) => {
  const [term, setTerm] = useState("");
  const [translatedTerm, setTranslatedTerm] = useState("");
  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedEntry) {
      setTerm(selectedEntry.term);
      setTranslatedTerm(selectedEntry.translatedTerm);
      setSourceLang(selectedEntry.sourceLang);
      setTargetLang(selectedEntry.targetLang);
    } else {
      // Reset form if not editing
      setTerm("");
      setTranslatedTerm("");
      setSourceLang("");
      setTargetLang("");
    }
  }, [selectedEntry]);

  const isFormValid = () => {
    return term && translatedTerm && sourceLang && targetLang;
  };

  const isSourceLanguageCorrect = () => {
    const isSinhalaTerm = /[\u0D80-\u0DFF]/.test(term);

    if (isSinhalaTerm && sourceLang !== "si") {
      alert("You entered a Sinhala term, please select 'Sinhala' as the source language and 'English' as the target language.");
      return false;
    }

    if (!isSinhalaTerm && sourceLang === "si") {
      alert("You entered an English term, please select 'English' as the source language and 'Sinhala' as the target language.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSourceLanguageCorrect()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (selectedEntry) {
        // Update existing glossary entry
        await axios.put(`http://localhost:4000/glossery/update/${selectedEntry._id}`, {
          term,
          translatedTerm,
          userId: 1, 
        });
        alert("Glossary entry updated successfully!");
      } else {
        // Add new glossary entry
        await axios.post("http://localhost:4000/glossery/add", {
          term,
          translatedTerm,
          sourceLang,
          targetLang,
          userId: 1, 
        });
        alert("Glossary entry added successfully!");
      }

      // Clear form after submission
      setTerm("");
      setTranslatedTerm("");
      setSourceLang("");
      setTargetLang("");

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error saving glossary entry:", error);
      alert(`Failed to ${selectedEntry ? "update" : "add"} glossary entry.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formTerm">
        <Form.Label>Term</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formTranslatedTerm">
        <Form.Label>Translated Term</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the translated term"
          value={translatedTerm}
          onChange={(e) => setTranslatedTerm(e.target.value)}
          required
        />
      </Form.Group>

      {/* These fields will be disabled when editing */}
      <Form.Group className="mb-3" controlId="formSourceLang">
        <Form.Label>Source Language</Form.Label>
        <Form.Select
          aria-label="Select source language"
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
          disabled={!!selectedEntry} // Disable if editing
          required
        >
          <option value="" disabled>Select source language</option>
          <LanguagesSelect value={sourceLang} onChange={(e) => setSourceLang(e.target.value)} />
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formTargetLang">
        <Form.Label>Target Language</Form.Label>
        <Form.Select
          aria-label="Select target language"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          disabled={!!selectedEntry} // Disable if editing
          required
        >
          <option value="" disabled>Select target language</option>
          <LanguagesSelect value={targetLang} onChange={(e) => setTargetLang(e.target.value)} />
        </Form.Select>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        disabled={isSubmitting || !isFormValid()}
      >
        {isSubmitting ? (selectedEntry ? "Updating..." : "Adding...") : (selectedEntry ? "Update Glossary" : "Add Glossary")}
      </Button>
    </Form>
  );
};

export default AddGlossary;
