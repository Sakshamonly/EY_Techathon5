// PatientDataForm.js
import React, { useState } from 'react';
import { Button, message, Steps } from 'antd';
import PatientInfo from './PatientInfo';
import MedicalHistoryForm from './MedicalHistoryForm';
import EmergencyContactForm from './EmergencyContactForm';
import { HeartOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';

const { Step } = Steps;

const PatientDataForm = () => {
  const [current, setCurrent] = useState(0);
  const [patientInfo, setPatientInfo] = useState({
    patient_Name: '',
    patient_DOB: '',
    patient_Gender: '',
    patient_Address: '',
    patient_Phone: '',
    patient_Email: '',
  });
  const [medicalHistory, setMedicalHistory] = useState({
    medicalConditions: '',
    medications: '',
    allergies: '',
  });
  const [emergencyContact, setEmergencyContact] = useState({
    contactName: '',
    contactRelationship: '',
    contactPhone: '',
  });

  const steps = [
    {
      title: 'Patient Info',
      content: <PatientInfo setPatientInfo={setPatientInfo} />,
      icon: <UserOutlined />,
    },
    {
      title: 'Medical History',
      content: <MedicalHistoryForm setMedicalHistory={setMedicalHistory} />,
      icon: <HeartOutlined />,
    },
    {
      title: 'Emergency Contact',
      content: <EmergencyContactForm setEmergencyContact={setEmergencyContact} />,
      icon: <PhoneOutlined />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = async () => {
    const data = {
      ...patientInfo,
      medicalHistory,
      emergencyContact,
    };

    console.log(data);

    try {
      const response = await fetch('http://localhost:8080/patient/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        message.success('Processing complete!');
      } else {
        message.error('Failed to submit data');
      }
    } catch (error) {
      message.error('An error occurred while submitting data');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-md pr-6 pl-6 pt-2">
        <h2 className='mb-4 font-bold text-xl text-center'>Patient Registration</h2>
        <Steps current={current} className="mb-6">
          {steps.map((item, index) => (
            <Step
              key={index}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </Steps>
        <div style={{ minHeight: '400px' }}>
          {steps[current].content}
        </div>
        <div style={{ marginTop: 24, textAlign: 'right' }}>
          {current > 0 && (
            <Button className='mb-2 mr-2' onClick={() => prev()}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button className='mb-2' type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button className='mb-2' type="primary" onClick={handleSubmit}>
              Done
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDataForm;
