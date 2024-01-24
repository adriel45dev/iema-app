import * as React from "react";
import { SVGProps } from "react";
const CourseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      fill="currentColor"
      d="M6 18H1a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1zm11 0h-5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1zM6 7H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1zm11.708-1.76-3.535 3.535a1 1 0 0 1-1.414 0L9.224 5.24a1 1 0 0 1 0-1.413L12.76.292a1 1 0 0 1 1.414 0l3.535 3.535a1 1 0 0 1-.002 1.414z"
    />
  </svg>
);
export default CourseIcon;
