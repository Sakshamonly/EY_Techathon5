import React, { useState } from 'react';
import { Button, message, Steps } from 'antd';
import TreatmentForm from './TreatmentForm';
import DoctorSelectionForm from './DoctorSelectionForm';
import TimeSlotForm from './TimeSlotForm';
import NotesAndDocuments from './NotesAndDocuments';
import { CalendarOutlined, MedicineBoxOutlined, ClockCircleOutlined, FileTextOutlined } from '@ant-design/icons';

const { Step } = Steps;

const AppointmentBookingForm = () => {
  const [current, setCurrent] = useState(0);
  const [appointmentDetails, setAppointmentDetails] = useState({
    treatment: '',
    date: '',
    notes: '',
    doctor: '',
    timeSlot: '',
    fees: '',
    files: [],
  });

  const steps = [
    {
      title: 'Treatment & Date',
      content: <TreatmentForm setAppointmentDetails={setAppointmentDetails} appointmentDetails={appointmentDetails} />,
      icon: <CalendarOutlined />,
    },
    {
      title: 'Select Doctor',
      content: <DoctorSelectionForm setAppointmentDetails={setAppointmentDetails} appointmentDetails={appointmentDetails} />,
      icon: <MedicineBoxOutlined />,
    },
    {
      title: 'Select Time Slot',
      content: <TimeSlotForm setAppointmentDetails={setAppointmentDetails} appointmentDetails={appointmentDetails} />,
      icon: <ClockCircleOutlined />,
    },
    {
      title: 'Notes & Documents',
      content: <NotesAndDocuments setAppointmentDetails={setAppointmentDetails} appointmentDetails={appointmentDetails} />,
      icon: <FileTextOutlined />,
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
      ...appointmentDetails,
      files: appointmentDetails.files.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file.originFileObj),
      })),
    };

    console.log(data);

    try {
      const response = await fetch('http://localhost:8080/appointment/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        message.success('Appointment booked successfully!');
      } else {
        message.error('Failed to book appointment');
      }
    } catch (error) {
      message.error('An error occurred while booking the appointment');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-md pr-6 pl-6 pt-2">
        <h2 className='mb-4 font-bold text-xl text-center'>Book Appointment</h2>
        <Steps
          current={current}
          className="mb-2"
          direction="horizontal" // Optional: Use "vertical" direction for more space.
        >
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

export default AppointmentBookingForm;
