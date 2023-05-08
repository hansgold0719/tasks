import React from "react";

const Button = (props) => (
  <button
    onClick={props.handleClick}
    className={`mt-4 ${props.bgColor} w-${props.width} hover:bg-${props.bgColor}-100 hover:text-${props.bgColor}-700 mx-3 px-8 py-3 shadow-sm shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80  text-white uppercase text-xs tracking-wider ${props.rounded}`}
    type="submit"
  >
    {props.content}
  </button>
);

export default Button;
