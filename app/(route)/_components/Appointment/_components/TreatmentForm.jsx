import React, { useEffect, useState } from 'react';
import './custom-scrollbar.css';

const TreatmentForm = ({ setAppointmentDetails, appointmentDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const response = await fetch('http://localhost:8080/speciality');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSpecialities(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialities();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // const treatments = [
  //   { name: 'Braces Application', description: 'Performed on a tooth', rating: 4.5, reviews: 120, price: 100 },
  //   { name: 'Crowns', description: 'Screening of teeth', rating: 4.5, reviews: 120, price: 40 },
  //   { name: 'Diagnostic x-rays', description: 'Screening of teeth', rating: 4.5, reviews: 120, price: 60 },
  //   { name: 'Fillings', description: 'Teeth can be filled', rating: 5.0, reviews: 120, price: 45 },
  //   { name: 'Simple extractions', description: 'Performed on a tooth', rating: 5.0, reviews: 120, price: 32 },
  //   // Add more treatments as needed
  // ];

  const filteredSpecialities = specialities.filter(speciality =>
    speciality.speciality_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSpecialitySelect = (speciality) => {
    setAppointmentDetails({ ...appointmentDetails, speciality: speciality.speciality_Id });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Treatments</h2>
      <input
        type="text"
        placeholder="Search treatments"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="space-y-4 max-h-96 overflow-y-auto hide-scrollbar custom-scrollbar">
        {filteredSpecialities.map((speciality) => (
          <div
            key={speciality.speciality_Id}
            onClick={() => handleSpecialitySelect(speciality)}
            className={`flex items-center justify-between p-4 border rounded cursor-pointer ${
              appointmentDetails.speciality === speciality.speciality_Id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <div>
              <h3 className="text-lg font-semibold">{speciality.speciality_Name}</h3>
              <p className="text-sm text-gray-500">{speciality.speciality_Description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-1 text-yellow-500">⭐</span>
                {/* <span>{treatment.rating} ({treatment.reviews} reviews)</span> */}
                <span>5  (120)reviews</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-500">START FROM</p>
              {/* <p className="text-lg font-semibold">${treatment.price}</p> */}
              <p className="text-lg font-semibold">$120</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreatmentForm;
