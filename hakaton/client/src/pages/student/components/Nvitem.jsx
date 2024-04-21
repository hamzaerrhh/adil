import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import Notification from "./Notification"; // Adjust the path based on your project structure

const NavItem = ({ text, items }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center cursor-pointer">
        {text}
        <span>
          <FaAngleDown />
        </span>
      </div>
      {items && isHovered && <Notification notification={items} />}
    </li>
  );
};

export default NavItem;
