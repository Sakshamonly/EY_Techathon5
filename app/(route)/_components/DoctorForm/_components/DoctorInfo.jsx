// import React, { useState, useEffect } from 'react';

// const DoctorInfo = ({ setDoctorInfo }) => {
//   const [info, setInfo] = useState({
//     // doctor_type: 'fulltime',
//     doctor_Name: '',
//     // specialist: '',
//     doctor_phone: '',
//     doctor_email: '',
//     doctor_address: '',
//   });

//   useEffect(() => {
//     setDoctorInfo(info);
//   }, [info, setDoctorInfo]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInfo((prevInfo) => ({
//       ...prevInfo,
//       [name]: value,
//     }));
//   };

//   const handleRadioChange = (type) => {
//     setInfo((prevInfo) => ({
//       ...prevInfo,
//       type: type,
//     }));
//   };
//   return (
//     <div>
//       <div className="mb-6">
//         {/* Photo upload */}
//         <div className="flex items-center justify-center mb-4">
//           <img src="/mnt/data/image.png" alt="Staff" className="w-16 h-16 rounded-full mr-4" />
//           <div>
//             <button className="text-blue-500 mr-2">Upload Photo</button>
//             <button className="text-red-500">Delete</button>
//             <p className="text-xs text-gray-500">An image of the person, it’s best if it has the same length and height</p>
//           </div>
//         </div>
//       </div>

//       {/* Form fields */}
//       {/* <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
//           Type
//         </label>
//         <div className="flex items-center">
//           <label className="flex items-center mr-4">
//             <input
//               type="radio"
//               name="type"
//               className="hidden"
//               value="fulltime"
//               checked={info.type === 'fulltime'}
//               onChange={handleChange}
//             />
//             <span
//               className={`inline-flex items-center px-3 py-2 hover:border-blue-600 border rounded-md cursor-pointer ${
//                 info.type === 'fulltime' ? 'border-blue-500' : 'border-gray-300'
//               }`}
//             >
//               Full time
//             </span>
//           </label>
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="type"
//               className="hidden"
//               value="parttime"
//               checked={info.type === 'parttime'}
//               onChange={handleChange}
//             />
//             <span
//               className={`inline-flex items-center px-3 py-2 hover:border-blue-600 border rounded-md cursor-pointer ${
//                 info.type === 'parttime' ? 'border-blue-500' : 'border-gray-300'
//               }`}
//             >
//               Part-Time
//             </span>
//           </label>
//         </div>
//       </div> */}

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//           Name
//         </label>
//         <input
//           id="doctor_Name"
//           name="doctor_Name"
//           type="text"
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           placeholder="Darrel Stuwert"
//           value={info.doctor_Name}
//           onChange={handleChange}
//         />
//       </div>

//       {/* <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialist">
//           Specialist
//         </label>
//         <select
//           id="specialist"
//           name="specialist"
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           value={info.specialist}
//           onChange={handleChange}
//         >
//           <option value="">Select Specialist</option>
//           <option value="Pediatric Dentistry">Pediatric Dentistry</option>
//           <option value="Orthodontics">Orthodontics</option>
//           <option value="Oral Surgery">Oral Surgery</option>
//         </select>
//       </div> */}

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
//           Phone Number
//         </label>
//         <input
//           id="doctor_phone"
//           name="doctor_phone"
//           type="text"
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           placeholder="808 555-0111"
//           value={info.doctor_phone}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//           Email Address
//         </label>
//         <input
//           id="doctor_email"
//           name="doctor_email"
//           type="email"
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           placeholder="darrelstuwert@gmail.com"
//           value={info.doctor_email}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
//           Address
//         </label>
//         <input
//           id="doctor_address"
//           name="doctor_address"
//           type="text"
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           placeholder="North Arizona, AZ 32 TH"
//           value={info.doctor_address}
//           onChange={handleChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default DoctorInfo;
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const DoctorInfo = ({ setDoctorInfo }) => {
  const [info, setInfo] = useState({
    doctor_Name: '',
    doctor_Phone: '',
    doctor_Email: '',
    doctor_Address: '',
    doctor_Clinic_Name: '', 
    doctor_Experience: '', 
    doctor_About: '', 
    speciality_Id: '',
  });
  const [specialities, setSpecialities] = useState([]);

  useEffect(() => {
    // Fetch specialities from the API
    axios.get('http://localhost:8080/speciality')
      .then(response => {
        setSpecialities(response.data);
      })
      .catch(error => {
        console.error('Error fetching specialities:', error);
      });
  }, []);
  useEffect(() => {
    setDoctorInfo(info);
  }, [info, setDoctorInfo]);

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
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctor_Name">
          Name
        </label>
        <input
          id="doctor_Name"
          name="doctor_Name"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Darrel Stuwert"
          value={info.doctor_Name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctor_Phone">
          Phone Number
        </label>
        <input
          id="doctor_Phone"
          name="doctor_Phone"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="808 555-0111"
          value={info.doctor_Phone}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctor_Email">
          Email Address
        </label>
        <input
          id="doctor_Email"
          name="doctor_Email"
          type="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="darrelstuwert@gmail.com"
          value={info.doctor_Email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="speciality_Id">
          Speciality
        </label>
        <select
          id="speciality_Id"
          name="speciality_Id"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          value={info.speciality_Id}
        >
          <option value="">Select Speciality</option>
          {/* Map over specialities to populate dropdown options */}
          {specialities.map(speciality => (
            <option key={speciality.speciality_Id} value={speciality.speciality_Id}>
              {speciality.speciality_Name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctor_Address">
          Address
        </label>
        <input
          id="doctor_Address"
          name="doctor_Address"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="North Arizona, AZ 32 TH"
          value={info.doctor_Address}
          onChange={handleChange}
        />
      </div>

      {/* New Fields */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctor_Clinic_Name">
          Clinic Name
        </label>
        <input
          id="doctor_Clinic_Name"
          name="doctor_Clinic_Name"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="ABC Clinic"
          value={info.doctor_Clinic_Name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctor_Experience">
          Experience
        </label>
        <input
          id="doctor_Experience"
          name="doctor_Experience"
          type="number"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="10"
          value={info.doctor_Experience}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctor_About">
          About Doctor
        </label>
        <textarea
          id="doctor_About"
          name="doctor_About"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Write something about the doctor..."
          value={info.doctor_About}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default DoctorInfo;
