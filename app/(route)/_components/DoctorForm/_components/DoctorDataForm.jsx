
import React, { useState } from 'react';
import { Button, message, Steps } from 'antd';
import DoctorInfo from './DoctorInfo';
import WorkingHoursForm from './WorkingHoursForm';
import DaysOffForm from './DaysOffForm';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';

const { Step } = Steps;

const DoctorDataForm = () => {
  const [current, setCurrent] = useState(0);
  const [doctorInfo, setDoctorInfo] = useState({});
  const [workingTime, setworkingTime] = useState({});
  const [daysOff, setDaysOff] = useState([]);

  const steps = [
    {
      title: 'Staff Info',
      content: <DoctorInfo setDoctorInfo={setDoctorInfo} />,
      icon: <UserOutlined />,
    },
    {
      title: 'Working Hours',
      content: <WorkingHoursForm setworkingTime={setworkingTime} />,
      icon: <LoadingOutlined />,
    },
    {
      title: 'Days Off',
      content: <DaysOffForm setDaysOff={setDaysOff} />,
      icon: <SmileOutlined />,
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
      ...doctorInfo, // Directly spread the doctorInfo state into the data object
      workingTime,
      daysOff,
    };

    console.log(data);

    try {
      const response = await fetch('http://localhost:8080/doctors/add', {
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
        <h2 className='mb-4 font-bold text-xl text-center'>Add new Doctor Staff</h2>
        <Steps current={current} className="mb-6">
          {steps.map((item, index) => (
            <Step
              key={index}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </Steps>
        <div style={{ minHeight: '570px' }}>
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

export default DoctorDataForm;
