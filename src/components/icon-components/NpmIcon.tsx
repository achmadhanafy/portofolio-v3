import React from "react";
interface Props {
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

function NpmIcon({
  color = "black",
  width = 20,
  height = 20,
  className,
}: Props) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 128 128"
      fill="currentColor"
    >
      <path d="M2 38.5h124v43.71H64v7.29H36.44v-7.29H2zm6.89 36.43h13.78V53.07h6.89v21.86h6.89V45.79H8.89zm34.44-29.14v36.42h13.78v-7.28h13.78V45.79zm13.78 7.29H64v14.56h-6.89zm20.67-7.29v29.14h13.78V53.07h6.89v21.86h6.89V53.07h6.89v21.86h6.89V45.79z"></path>
    </svg>
  );
}

export default NpmIcon;
