import React from "react";

const TotalValueSection = ({ value }) => {
  return (
    <div className="container d-flex text-center align-middle justify-content-end month-handler mb-3 mt-3">
      <small
        className="text-muted h3"
        style={{ marginRight: "2%", marginBottom: "0", verticalAlign: "auto" }}
      >
        Total Value:{" "}
      </small>
      <button className="btn btn-lg btn-warning">{value}</button>
    </div>
  );
};

export default TotalValueSection;
