// PatientInfo.js
import React, { useState, useEffect } from 'react';

const PatientInfo = ({ setPatientInfo }) => {
  const [info, setInfo] = useState({
    patient_Name: '',
    patient_DOB: '',
    patient_Gender: '',
    patient_Address: '',
    patient_Phone: '',
    patient_Email: '',
  });

  useEffect(() => {
    setPatientInfo(info);
  }, [info, setPatientInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patient_Name">
          Name
        </label>
        <input
          id="patient_Name"
          name="patient_Name"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="John Doe"
          value={info.patient_Name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patient_DOB">
          Date of Birth
        </label>
        <input
          id="patient_DOB"
          name="patient_DOB"
          type="date"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={info.patient_DOB}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patient_Gender">
          Gender
        </label>
        <select
          id="patient_Gender"
          name="patient_Gender"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={info.patient_Gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patient_Address">
          Address
        </label>
        <input
          id="patient_Address"
          name="patient_Address"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="123 Main St"
          value={info.patient_Address}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patient_Phone">
          Phone Number
        </label>
        <input
          id="patient_Phone"
          name="patient_Phone"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="123-456-7890"
          value={info.patient_Phone}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patient_Email">
          Email Address
        </label>
        <input
          id="patient_Email"
          name="patient_Email"
          type="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="johndoe@example.com"
          value={info.patient_Email}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PatientInfo;
