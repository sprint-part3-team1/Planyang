import React from 'react';

interface Props {
  color: string;
  setCheckColor: React.Dispatch<React.SetStateAction<string>>; // Define the type for setCheckColor
}
const DashBoardEditCircle = ({ color, setCheckColor }: Props) => {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      cursor="pointer"
      onClick={() => {
        setCheckColor(color);
      }}
    >
      <circle
        id="Ellipse 42"
        cx="19"
        cy="19"
        r="18"
        fill={color}
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
};

export default DashBoardEditCircle;
