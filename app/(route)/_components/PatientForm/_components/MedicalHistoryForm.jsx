// MedicalHistoryForm.js
import React, { useState, useEffect } from 'react';

const MedicalHistoryForm = ({ setMedicalHistory }) => {
  const [history, setHistory] = useState({
    medicalConditions: '',
    medications: '',
    allergies: '',
  });

  useEffect(() => {
    setMedicalHistory(history);
  }, [history, setMedicalHistory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHistory((prevHistory) => ({
      ...prevHistory,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicalConditions">
          Medical Conditions
        </label>
        <input
          id="medicalConditions"
          name="medicalConditions"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g., Diabetes, Hypertension"
          value={history.medicalConditions}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medications">
          Medications
        </label>
        <input
          id="medications"
          name="medications"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g., Metformin, Lisinopril"
          value={history.medications}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="allergies">
          Allergies
        </label>
        <input
          id="allergies"
          name="allergies"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g., Penicillin, Nuts"
          value={history.allergies}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default MedicalHistoryForm;
