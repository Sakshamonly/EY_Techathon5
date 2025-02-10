import React, { useState } from 'react';
import moment from 'moment';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const VerticalCalendar = ({ onDateSelect }) => {
  const [currentWeek, setCurrentWeek] = useState(moment().startOf('week').add(1, 'days'));
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = Array.from({ length: 7 }, (_, index) => currentWeek.clone().add(index, 'days'));

  const handlePreviousWeek = () => {
    setCurrentWeek(prevWeek => prevWeek.clone().subtract(1, 'weeks'));
  };

  const handleNextWeek = () => {
    setCurrentWeek(prevWeek => prevWeek.clone().add(1, 'weeks'));
  };

  const handleDateClick = (date) => {
    const formattedDate = date.format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
    onDateSelect(formattedDate);
  };

  return (
    <div className="text-center">
      <div className="text-gray-500 text-lg mb-2 font-semibold">{currentWeek.format('MMMM YYYY')}</div>
      <div className="flex justify-around items-center p-5 bg-white rounded-lg shadow-md max-w-lg mx-auto">
        <button onClick={handlePreviousWeek} className="text-gray-700 text-2xl cursor-pointer hover:scale-125 transition-all ease-in-out">
          <FaChevronLeft />
        </button>
        {daysOfWeek.map((day, index) => (
          <div className="text-center" key={index}>
            <span className="block text-gray-700">{day}</span>
            <button
              onClick={() => handleDateClick(dates[index])}
              className={`mt-2 p-2 rounded-full w-10 h-10 flex items-center border border-gray-300 justify-center  hover:border-blue-700 hover:bg-white hover:text-gray-700
                ${dates[index].format('YYYY-MM-DD') === selectedDate ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
            >
              {dates[index].date()}
            </button>
          </div>
        ))}
        <button onClick={handleNextWeek} className="text-gray-700 text-2xl cursor-pointer hover:scale-125 transition-all ease-in-out">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default VerticalCalendar;
