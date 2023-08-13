import React from "react";
import { filterMenu } from "../Data/data.ts";
const DropDownMenu = ({ onSelectFilter, message }) => {
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
        {filterMenu.map((filter) => {
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
