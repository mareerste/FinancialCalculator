import React, { useState } from "react";

const CheckBoxComponent = ({ messageOff, messageOn, onClick }) => {
  const [checked, setChecked] = useState(false);
  const handleOnClick = () => {
    setChecked(!checked);
    onClick(!checked);
  };
  return (
    <div className="form-check form-switch" style={{ marginRight: "2%" }}>
      <input
        className="form-check-input btn btn-warning"
        type="checkbox"
        onClick={handleOnClick}
        id="flexSwitchCheckDefault"
      />
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
        {checked ? messageOn : messageOff}
      </label>
    </div>
  );
};

export default CheckBoxComponent;
