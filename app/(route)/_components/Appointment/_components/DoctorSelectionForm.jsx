import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { StarFilled, SearchOutlined } from '@ant-design/icons';
import './custom-scrollbar.css';

const DoctorSelectionForm = ({ setAppointmentDetails, appointmentDetails }) => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch doctors when speciality ID changes
    const fetchDoctors = async () => {
      if (appointmentDetails.speciality) {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:8080/doctors/speciality/${appointmentDetails.speciality}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setDoctors(data);
          setFilteredDoctors(data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDoctors();
  }, [appointmentDetails.speciality]);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setAppointmentDetails({ ...appointmentDetails, doctor: doctor.doctor_Id });
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = doctors.filter((doctor) =>
      doctor.doctor_Name.toLowerCase().includes(value) ||
      doctor.speciality_Name.toLowerCase().includes(value)
    );
    setFilteredDoctors(filtered);
  };

  if (loading) {
    return <p>Loading doctors...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Form layout="vertical">
      <Form.Item label="Search Doctor">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search by name or specialty"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Item>
      <Form.Item label="Select Doctor">
        <div className="max-h-96 overflow-y-auto hide-scrollbar custom-scrollbar">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.doctor_Id}
              className={`flex items-center p-4 mb-4 border rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer ${selectedDoctor?.doctor_Id === doctor.doctor_Id ? 'bg-blue-50 border-blue-500' : ''}`}
              onClick={() => handleSelectDoctor(doctor)}
            >
              <img src={doctor.doctor_Image_Name || 'default-doctor.jpg'} alt={doctor.doctor_Name} className="w-16 h-16 rounded-full mr-4" />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{doctor.doctor_Name}</h3>
                <p className="text-sm text-gray-600">{doctor.speciality_Name}</p>
                <p className="text-sm text-gray-600">{doctor.doctor_Experience} years experience</p>
                <p className="text-sm text-gray-600">{doctor.doctor_About}</p>
                <p className="text-sm text-green-600">Available today</p>
                <p className="text-sm text-gray-800">$100</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarFilled key={i} className={i < 4 ? 'text-yellow-500' : 'text-gray-300'} />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">4.5</span>
                </div>
              </div>
              <Button type="link" onClick={(e) => { e.stopPropagation(); alert(`Showing details for ${doctor.doctor_Name}`); }}>
                Show Details
              </Button>
            </div>
          ))}
        </div>
      </Form.Item>
    </Form>
  );
};

export default DoctorSelectionForm;
