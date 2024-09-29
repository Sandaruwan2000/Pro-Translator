import React from "react";
import data from "./data.json"

const LanguagesSelect = ({ value, onChange }) => {
  return (
    <React.Fragment>
      {Object.keys(data.languages).map((key) => (
        <option key={key} value={key}>
          {data.languages[key]}
        </option>
      ))}
    </React.Fragment>
  );
};

export default LanguagesSelect;
