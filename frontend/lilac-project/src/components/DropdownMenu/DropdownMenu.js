import React from "react";

const DropdownMenu = ({ title, items, onItemClick }) => {
  return (
    <div className="dropdown">
      <div className="dropdownTitle">{title}</div>
      <ul className="dropdownItems">
        {items.map((item, index) => (
          <li key={index} className="dropdownItem">
            <div onClick={() => onItemClick(item)}>{item}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
