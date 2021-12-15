import React from "react";
import "./CircularScroll.scss";

const CircularScroll: React.FC<ICircularScrollProps> = ({ percent }) => {
  const scrollPercent = 125.664 - (percent / 100) * 125.664;
  return (
    <svg className="progress-ring" viewBox="0 0 40 40" style={{ opacity: "1" }}>
      <circle
        className="progress-ring__circle js-progress"
        fill="transparent"
        r="18"
        stroke-width="2"
        cx="20"
        cy="20"
        // strokeDasharray="125.664, 125.664"
        // strokeDashoffset={scrollPercent}
        stroke="currentColor"
        style={{
          strokeDasharray: "125.664, 125.664",
          strokeDashoffset: scrollPercent,
        }}
      ></circle>
    </svg>
  );
};

export default CircularScroll;
