import React from "react";

const SearchFieldComponent = ({ text, onChange }) => {
  return (
    <div className="d-flex align-items-center ml-3">
      <div className="form-group row align-items-center mb-0">
        <label
          htmlFor="formGroupExampleInput"
          className="col-sm-4 col-form-label text-nowrap mr-2"
        >
          {text}
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control"
            onChange={(e) => onChange(e.target.value)}
            id="formGroupExampleInput"
            placeholder="Search.."
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFieldComponent;
