import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-2 text-center">Calendar</h2>
      <Calendar 
        onChange={setDate} 
        value={date} 
        className="w-full border-none rounded-lg"
      />
    </div>
  );
};

export default MyCalendar;
