import React, { useState, useEffect } from 'react';
import { Switch, TimePicker } from 'antd';
import dayjs from 'dayjs';

const WorkingHoursForm = ({ setworkingTime }) => {
  const format = 'hh:mm A'; // 12-hour format with AM/PM
  const jsonFormat = 'HH:mm:ss'; // 24-hour format for JSON
  const defaultFrom = '09:00 am';
  const defaultTo = '05:00 pm';

  const [workingTime, setHours] = useState({
    monday: { enabled: true, from: '09:00 am', to: '05:00 pm' },
    tuesday: { enabled: true, from: '09:00 am', to: '05:00 pm' },
    wednesday: { enabled: true, from: '09:00 am', to: '05:00 pm' },
    thursday: { enabled: true, from: '09:00 am', to: '05:00 pm' },
    friday: { enabled: true, from: '09:00 am', to: '05:00 pm' },
    saturday: { enabled: true, from: '09:00 am', to: '05:00 pm' },
    sunday: { enabled: true, from: '09:00 am', to: '05:00 pm' }
  });

  useEffect(() => {
    const formattedTime = {
      mondayFrom: workingTime.monday.enabled ? dayjs(workingTime.monday.from, format).format(jsonFormat) : null,
      mondayTo: workingTime.monday.enabled ? dayjs(workingTime.monday.to, format).format(jsonFormat) : null,
      tuesdayFrom: workingTime.tuesday.enabled ? dayjs(workingTime.tuesday.from, format).format(jsonFormat) : null,
      tuesdayTo: workingTime.tuesday.enabled ? dayjs(workingTime.tuesday.to, format).format(jsonFormat) : null,
      wednesdayFrom: workingTime.wednesday.enabled ? dayjs(workingTime.wednesday.from, format).format(jsonFormat) : null,
      wednesdayTo: workingTime.wednesday.enabled ? dayjs(workingTime.wednesday.to, format).format(jsonFormat) : null,
      thursdayFrom: workingTime.thursday.enabled ? dayjs(workingTime.thursday.from, format).format(jsonFormat) : null,
      thursdayTo: workingTime.thursday.enabled ? dayjs(workingTime.thursday.to, format).format(jsonFormat) : null,
      fridayFrom: workingTime.friday.enabled ? dayjs(workingTime.friday.from, format).format(jsonFormat) : null,
      fridayTo: workingTime.friday.enabled ? dayjs(workingTime.friday.to, format).format(jsonFormat) : null,
      saturdayFrom: workingTime.saturday.enabled ? dayjs(workingTime.saturday.from, format).format(jsonFormat) : null,
      saturdayTo: workingTime.saturday.enabled ? dayjs(workingTime.saturday.to, format).format(jsonFormat) : null,
      sundayFrom: workingTime.sunday.enabled ? dayjs(workingTime.sunday.from, format).format(jsonFormat) : null,
      sundayTo: workingTime.sunday.enabled ? dayjs(workingTime.sunday.to, format).format(jsonFormat) : null,
    };

    setworkingTime(formattedTime);
  }, [workingTime, setworkingTime]);

  const handleToggle = (day) => {
    setHours((prevHours) => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        enabled: !prevHours[day].enabled
      }
    }));
  };

  const handleChange = (day, field, value) => {
    setHours((prevHours) => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        [field]: value
      }
    }));
  };

  return (
    <div>
      {Object.keys(workingTime).map((day, index) => (
        <div key={day}>
          <div className="flex items-center justify-between p-4">
            <label className="flex items-center font-bold" style={{ width: '180px' }}>
              <Switch
                checked={workingTime[day].enabled}
                onChange={() => handleToggle(day)}
              />
              <span className="ml-3">{day}</span>
            </label>
            {workingTime[day].enabled ? (
              <div className="flex items-center">
                <TimePicker
                  value={workingTime[day].from ? dayjs(workingTime[day].from, format) : null}
                  format={format}
                  onChange={(time, timeString) => handleChange(day, 'from', timeString)}
                />
                <span className="mx-2 text-sm text-gray-400 font-bold">to</span>
                <TimePicker
                  value={workingTime[day].to ? dayjs(workingTime[day].to, format) : null}
                  format={format}
                  onChange={(time, timeString) => handleChange(day, 'to', timeString)}
                />
              </div>
            ) : (
              <div className="flex items-center ml-6 text-red-400 font-bold">
                Not working on this day
              </div>
            )}
          </div>
          {index < Object.keys(workingTime).length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
};

export default WorkingHoursForm;

