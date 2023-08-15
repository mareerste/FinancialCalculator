import React from "react";

const ValueButton = ({ value, text }) => {
  return (
    <>
      <small
        className="text-muted h3"
        style={{ marginRight: "3%", whiteSpace: "nowrap" }}
      >
        {text}
      </small>
      <button className="btn btn-lg btn-warning custom-disabled">
        {value?.toFixed(2)}
      </button>
    </>
  );
};

export default ValueButton;
