import React from "react";
const ButtonOutline = (props) => {
  <button
    className="px-4 py-2 mx-2 text-gray-800 rounded-md border border-gray-400 focus:outline-none focus:border-gray-600 flex justify-center align-middle items-center"
    onClick={props.handleClick}
  >
    {props.item}
  </button>;
};

export default ButtonOutline;
