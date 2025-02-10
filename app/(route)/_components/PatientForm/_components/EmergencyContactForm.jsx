// EmergencyContactForm.js
import React, { useState, useEffect } from 'react';

const EmergencyContactForm = ({ setEmergencyContact }) => {
  const [contact, setContact] = useState({
    contactName: '',
    contactRelationship: '',
    contactPhone: '',
  });

  useEffect(() => {
    setEmergencyContact(contact);
  }, [contact, setEmergencyContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactName">
          Contact Name
        </label>
        <input
          id="contactName"
          name="contactName"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g., Jane Doe"
          value={contact.contactName}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactRelationship">
          Relationship
        </label>
        <input
          id="contactRelationship"
          name="contactRelationship"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g., Mother"
          value={contact.contactRelationship}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactPhone">
          Contact Phone
        </label>
        <input
          id="contactPhone"
          name="contactPhone"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g., 123-456-7890"
          value={contact.contactPhone}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default EmergencyContactForm;
