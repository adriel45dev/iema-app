import * as React from "react";
import { SVGProps } from "react";
const EditIcon = (props: SVGProps<SVGSVGElement>) => (
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
      fillRule="evenodd"
      d="M14.97 3.344a13.006 13.006 0 0 0-5.94 0A7.63 7.63 0 0 0 3.344 9.03a13.006 13.006 0 0 0 0 5.94 7.63 7.63 0 0 0 5.686 5.686c1.953.459 3.987.459 5.94 0a7.63 7.63 0 0 0 5.686-5.686 13.006 13.006 0 0 0 0-5.94 7.63 7.63 0 0 0-5.686-5.686Zm-2.348 4.901a2.215 2.215 0 0 1 3.133 3.133l-2.5 2.5a9.054 9.054 0 0 1-4.206 2.381l-.483.121a.78.78 0 0 1-.946-.946l.12-.483a9.054 9.054 0 0 1 2.382-4.206l2.5-2.5Zm1.566.5c-.283 0-.554.113-.754.313l-.362.362c-.036.285.106.683.466 1.042.359.36.757.502 1.042.466l.362-.362a1.066 1.066 0 0 0-.754-1.82Zm-.57 3.146a2.984 2.984 0 0 1-.893-.616 2.983 2.983 0 0 1-.616-.892l-1.175 1.174a7.905 7.905 0 0 0-2.05 3.558 7.905 7.905 0 0 0 3.559-2.05l1.174-1.174Z"
      clipRule="evenodd"
    />
  </svg>
);
export default EditIcon;
