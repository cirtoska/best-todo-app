import React from "react";
import { FaSortAlphaDown, FaSort, FaSortDown } from "react-icons/fa";

const FilterData = ({
  handleToggleAZ,
  handleToggleDate,
  handleStatusChange,
}) => {
  return (
    <ul className="table-header">
      <li title="Sort by Name" onClick={handleToggleAZ}>
        Name <FaSortAlphaDown />
      </li>
      <li title="Sort by Date" onClick={handleToggleDate}>
        Date <FaSort />
      </li>
      <li className="dropdown">
        Status <FaSortDown />
        <ul className="dropdown-content">
          <li onClick={() => handleStatusChange("all")} title="List All Tasks">
            All
          </li>
          <li
            onClick={() => handleStatusChange("active")}
            title="List Active Tasks"
          >
            active
          </li>
          <li
            onClick={() => handleStatusChange("completed")}
            title="List Completed Tasks"
          >
            completed
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default FilterData;
