import React from "react";
const DropDownMenu = ({ onSelectFilter, message, sortList }) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-warning text-dark dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {message}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {sortList.map((filter) => {
          return (
            <li key={filter}>
              <a
                className="dropdown-item"
                onClick={() => {
                  onSelectFilter(filter);
                }}
                type="button"
              >
                {filter}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DropDownMenu;
