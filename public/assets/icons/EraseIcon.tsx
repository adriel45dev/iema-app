import * as React from "react";
import { SVGProps } from "react";
const EraseIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M14.952 3c-1.037 0-1.872.835-3.542 2.505l-4.91 4.91 7.085 7.085 4.91-4.91C20.165 10.92 21 10.085 21 9.048c0-1.038-.835-1.873-2.505-3.543C16.825 3.835 15.99 3 14.952 3Z"
      opacity={0.5}
    />
    <path
      fill="currentColor"
      d="M13.585 17.5 6.5 10.415l-.995.995C3.835 13.08 3 13.915 3 14.952c0 1.038.835 1.873 2.505 3.543C7.175 20.165 8.01 21 9.048 21c1.037 0 1.872-.835 3.542-2.505l.995-.995Z"
    />
    <g fill="currentColor" opacity={0.5}>
      <path d="M9.033 21H9h.033ZM9.063 21c.796-.006 1.476-.506 2.51-1.5H21a.75.75 0 0 1 0 1.5H9.063Z" />
    </g>
  </svg>
);
export default EraseIcon;
