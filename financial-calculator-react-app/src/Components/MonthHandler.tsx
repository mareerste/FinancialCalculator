import React, { useEffect, useState } from "react";
import { getMonthFromDate } from "../Helper/HelperFunction.ts";

const MonthHandler = ({ currentDate, changeDate }) => {
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(1);

  useEffect(() => {
    setMonth(getMonthFromDate(currentDate));
    setYear(currentDate.getFullYear());
  }, [currentDate]);

  const prevMonth = () => {
    currentDate.setMonth(month - 2);
    changeDate(currentDate);
  };

  const nextMonth = () => {
    currentDate.setMonth(month);
    changeDate(currentDate);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="container d-flex text-center align-middle justify-content-between month-handler mb-3">
      <button className="btn btn-warning" value={"prev"} onClick={prevMonth}>
        Previous
      </button>
      <p className="text-center align-middle mb-0 h3">
        {months.at(month - 1)} - {year}
      </p>
      <button className="btn btn-warning" value={"next"} onClick={nextMonth}>
        Next
      </button>
    </div>
  );
};

export default MonthHandler;
