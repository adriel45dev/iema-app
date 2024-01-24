import * as React from "react";
import { SVGProps } from "react";
const MenuDotsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M7 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM21 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
    />
    <path
      fill="currentColor"
      d="M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
      opacity={0.5}
    />
  </svg>
);
export default MenuDotsIcon;
