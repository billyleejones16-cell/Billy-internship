import React from "react";
import "./Skeleton.css";

const Skeleton = ({ width, height, borderRadius, style }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width: width || "100%",
        height: height || "1rem",
        borderRadius: borderRadius || "4px",
        display: "inline-block",
        ...style,
      }}
    />
  );
};

export default Skeleton;
