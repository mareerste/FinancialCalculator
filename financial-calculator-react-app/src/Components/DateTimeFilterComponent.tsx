import React, { useState } from "react";

const DateTimeFilterComponent = ({ onSubmit }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setShowMessage(false);
    if (!startDate || !endDate) {
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setErrorMessage("Incorrect date range.");
      setShowMessage(true);
      return;
    }

    onSubmit(startDate, endDate);
    setStartDate("");
    setEndDate("");
  };
  return (
    <>
      <form onSubmit={handleOnSubmit} className="date-filter-form">
        <label htmlFor="startDate">Start Date:</label>
        <input
          className="form-control"
          style={{ flex: "1" }}
          type="date"
          id="startDate"
          value={startDate}
          required
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor="endDate">End Date:</label>
        <input
          className="form-control"
          style={{ flex: "1" }}
          type="date"
          id="endDate"
          value={endDate}
          required
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button className="btn btn-outline-warning text-dark" type="submit">
          Search
        </button>
      </form>
      {showMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default DateTimeFilterComponent;
