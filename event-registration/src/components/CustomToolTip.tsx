import React from "react";
import "../index.css";
interface TooltipProps {
  value: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ value }) => {
  return <div className="custom-tooltip">{value}</div>;
};

export default CustomTooltip;
