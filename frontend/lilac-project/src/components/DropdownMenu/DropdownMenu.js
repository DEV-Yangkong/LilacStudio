import React from "react";

const DropdownMenu = ({ title, items }) => {
  return (
    <div className="dropdown">
      {" "}
      {/* styles.dropdown -> "dropdown" */}
      <div className="dropdownTitle">
        {" "}
        {/* styles.dropdownTitle -> "dropdownTitle" */}
        {title}
      </div>
      <ul className="dropdownItems">
        {" "}
        {/* styles.dropdownItems -> "dropdownItems" */}
        {items.map((item, index) => (
          <li key={index} className="dropdownItem">
            {" "}
            {/* styles.dropdownItem -> "dropdownItem" */}
            <a href="#">{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
