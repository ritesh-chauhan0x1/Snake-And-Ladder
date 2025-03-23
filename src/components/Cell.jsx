import React, { useEffect, useRef } from "react";

const Cell = ({ value, refMapping, index }) => {
  const cellRef = useRef();

  useEffect(() => {
    refMapping[value] = cellRef; // Safe update inside useEffect
  }, [value, refMapping]);

  return (
    <div
      ref={cellRef}
      className="h-[70px] w-[70px] text-red-500 flex items-center justify-center"
    ></div>
  );
};

export default Cell;
