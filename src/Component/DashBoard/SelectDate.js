import React, { useState } from "react"
import DatePicker from "react-datepicker"
// import { Card, CardBody } from "reactstrap"
import "react-datepicker/dist/react-datepicker.css"

import calendar from "../../assets/image/calendar.png"
   
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const SelectDate = () => {
  const [startDate, setStartDate] = useState(new Date())
  return (
    <div
      style={{
        padding: "10px 20px",
        width: "320px",
        border: "0.1px solid #f3f3f7",
        backgroundColor: "white",
        marginBottom: "10px",
      }}
    >
      <div style={{ display: "flex", width: "80%" }}>
        <img
          src={calendar}
          className="calendar-dashboard"
          alt="calender"
          style={{ marginRight: "20px", marginTop: "2px" }}
        />
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
        ></DatePicker>
      </div>
    </div>
  )
}

export default SelectDate
