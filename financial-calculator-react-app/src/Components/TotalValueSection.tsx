import React from "react";

const TotalValueSection = ({ value, text, secondValue, secondText }) => {
  return (
    <div className="container d-flex text-center align-middle justify-content-end month-handler mb-3 mt-3">
      {secondValue && (
        <div
          className="d-flex align-items-center ml-3"
          style={{ marginLeft: "3vh", marginRight: "2vh" }}
        >
          <small
            className="text-muted h3"
            style={{ marginRight: "3%", whiteSpace: "nowrap" }}
          >
            {secondText}
          </small>
          <button className="btn btn-lg btn-warning custom-disabled">
            {secondValue.toFixed(2)}
          </button>
        </div>
      )}
      <div className="d-flex align-items-center">
        <small
          className="text-muted h3"
          style={{ marginRight: "2vh", whiteSpace: "nowrap" }}
        >
          {text}
        </small>
        <button className="btn btn-lg btn-warning custom-disabled">
          {value.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default TotalValueSection;
