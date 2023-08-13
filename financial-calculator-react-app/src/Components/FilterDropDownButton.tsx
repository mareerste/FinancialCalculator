import React from "react";
import { filterMenu } from "../Data/data.ts";
import CheckBoxComponent from "./CheckBoxComponent.tsx";

const FilterDropDownButton = ({ onSelectFilter, onSwitchButton }) => {
  return (
    <div className="dropdown d-flex justify-content-end mb-2">
      <CheckBoxComponent
        messageOff={"Show all expenses"}
        messageOn={"Show montly expenses"}
        onClick={(clicked) => {
          onSwitchButton(clicked);
        }}
      ></CheckBoxComponent>
      <div className="dropdown">
        <button
          className="btn btn-warning text-dark dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown button
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
    </div>
  );
};

export default FilterDropDownButton;
