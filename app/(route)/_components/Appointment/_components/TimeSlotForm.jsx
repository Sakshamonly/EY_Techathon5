import React, { useEffect, useState } from 'react';
import { Form, Button, message } from 'antd';
import VerticalCalendar from './VerticalCalendar';

const TimeSlotForm = ({ setAppointmentDetails, appointmentDetails }) => {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [timeSlots, setTimeSlots] = useState({
    morning: [],
    day: [],
    evening: []
  });

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/doctors/doctordetails/${appointmentDetails.doctor}`);
        const data = await response.json();
        setDoctorDetails(data);
      } catch (error) {
        message.error('Failed to fetch doctor details');
      }
    };

    fetchDoctorDetails();
  }, []);

  useEffect(() => {
    if (doctorDetails && appointmentDetails.date) {
      console.log("Generating time slots for date:", appointmentDetails.date);
      generateTimeSlots(doctorDetails, new Date(appointmentDetails.date));
    }
  }, [doctorDetails, appointmentDetails.date]);

  const isDateInRange = (date, dateFrom, dateTo) => {
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    return date >= from && date <= to;
  };

  const generateTimeSlots = (doctorDetails, selectedDate) => {
    const dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    console.log("Selected day of week:", dayOfWeek);

    const isDayOff = doctorDetails.daysOff && doctorDetails.daysOff.some(dayOff => {
      if (dayOff.repeatEveryYear) {
        const year = selectedDate.getFullYear();
        const fromDate = new Date(`${year}-${dayOff.dateFrom.slice(5)}`);
        const toDate = new Date(`${year}-${dayOff.dateTo.slice(5)}`);
        return isDateInRange(selectedDate, fromDate, toDate);
      }
      return isDateInRange(selectedDate, dayOff.dateFrom, dayOff.dateTo);
    });

    console.log("Is day off:", isDayOff);

    if (isDayOff) {
      setTimeSlots({ morning: [], day: [], evening: [] });
      return;
    }

    const fromTime = doctorDetails.workingTime[`${dayOfWeek}From`];
    const toTime = doctorDetails.workingTime[`${dayOfWeek}To`];

    console.log("Working hours from:", fromTime, "to:", toTime);

    if (fromTime && toTime) {
      let from = new Date(`1970-01-01T${fromTime}`);
      let to = new Date(`1970-01-01T${toTime}`);

      // If the `to` time is earlier in the day than `from`, it means the working hours span midnight.
      if (to <= from) {
        to.setDate(to.getDate() + 1); // move to the next day
      }

      const slots = [];
      let currentTime = new Date(from);

      console.log("Initial currentTime:", currentTime);
      console.log("to time:", to);

      while (currentTime < to) {
        slots.push(currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
        currentTime.setMinutes(currentTime.getMinutes() + 60);
        console.log("Current time in loop:", currentTime);
      }

      console.log("Generated slots:", slots);

      const categorizedSlots = {
        morning: slots.filter(slot => {
          const [hour, period] = slot.split(' ');
          const hourInt = parseInt(hour.split(':')[0]);
          return period === 'AM' && hourInt < 12;
        }),
        day: slots.filter(slot => {
          const [hour, period] = slot.split(' ');
          const hourInt = parseInt(hour.split(':')[0]);
          return (period === 'PM' && hourInt < 5) || (period === 'AM' && hourInt === 12);
        }),
        evening: slots.filter(slot => {
          const [hour, period] = slot.split(' ');
          const hourInt = parseInt(hour.split(':')[0]);
          return period === 'PM' && hourInt >= 5;
        })
      };

      console.log("Categorized slots:", categorizedSlots);

      setTimeSlots(categorizedSlots);
    } else {
      console.log("No working hours defined for this day.");
      setTimeSlots({ morning: [], day: [], evening: [] });
    }
  };

  const handleTimeSlotSelect = (slot) => {
    setAppointmentDetails({ ...appointmentDetails, timeSlot: slot });
  };

  const handleDateSelect = (date) => {
    setAppointmentDetails({ ...appointmentDetails, date });
  };

  return (
    <div>
      <VerticalCalendar onDateSelect={handleDateSelect} />

      <Form
        layout="vertical"
        initialValues={appointmentDetails}
        onValuesChange={(changedValues) => setAppointmentDetails({ ...appointmentDetails, ...changedValues })}
      >
        <Form.Item
          name="timeSlot"
          rules={[{ required: true, message: 'Please select a time slot!' }]}
        >
          <div className="space-y-6 mt-6">
            <div>
              <div className="flex items-center mb-2">
                <span className="text-yellow-500 mr-2">☀️</span>
                <h4 className="text-lg font-semibold">Morning</h4>
              </div>
              <div className="flex space-x-2">
                {timeSlots.morning.map((slot, index) => (
                  <Button
                    key={index}
                    className={`py-2 px-4 border rounded ${appointmentDetails.timeSlot === slot ? 'bg-blue-500 text-white' : 'bg-white'}`}
                    onClick={() => handleTimeSlotSelect(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <span className="text-yellow-500 mr-2">🌞</span>
                <h4 className="text-lg font-semibold">Day</h4>
              </div>
              <div className="flex space-x-2">
                {timeSlots.day.map((slot, index) => (
                  <Button
                    key={index}
                    className={`py-2 px-4 border rounded ${appointmentDetails.timeSlot === slot ? 'bg-blue-500 text-white' : 'bg-white'}`}
                    onClick={() => handleTimeSlotSelect(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <span className="text-blue-500 mr-2">🌙</span>
                <h4 className="text-lg font-semibold">Evening</h4>
              </div>
              <div className="flex space-x-2">
                {timeSlots.evening.map((slot, index) => (
                  <Button
                    key={index}
                    className={`py-2 px-4 border rounded ${appointmentDetails.timeSlot === slot ? 'bg-blue-500 text-white' : 'bg-white'}`}
                    onClick={() => handleTimeSlotSelect(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TimeSlotForm;
