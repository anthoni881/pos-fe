import React from "react";
import "./PopUpComponent.css";

const PopUpComponent = ({ children, style, small, className }) => {
  return (
    <div className="container_popup">
      <div className={className ? className : "wrapper_popup"} style={style}>
        {children}
      </div>
    </div>
  );
};
export default PopUpComponent;
