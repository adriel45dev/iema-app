import * as React from "react";
import { SVGProps } from "react";
const DocIcon = (props: SVGProps<SVGSVGElement>) => (
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
      fillOpacity={0.24}
      d="M5 5a2 2 0 0 1 2-2h4.75a.25.25 0 0 1 .25.25V8a2 2 0 0 0 2 2h4.75a.25.25 0 0 1 .25.25V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5Z"
    />
    <path
      fill="currentColor"
      d="M13 8V3.604a.25.25 0 0 1 .427-.177l5.146 5.146a.25.25 0 0 1-.177.427H14a1 1 0 0 1-1-1Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      d="M8.5 13.5h6M8.5 16.5h5"
    />
  </svg>
);
export default DocIcon;
