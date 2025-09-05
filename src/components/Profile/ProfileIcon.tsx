import React from "react";

const ProfileIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <style type="text/css">
      {`.st1{fill:none;stroke:#000000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}`}
    </style>
    <g>
      <path
        className="st1"
        d="M1.1,9.4C2.3,4.4,6.7,0.8,12,0.8c5.3,0,9.7,3.7,10.9,8.6"
      />
      <path
        className="st1"
        d="M23.3,12c0,6.2-5,11.3-11.3,11.3c-6.2,0-11.3-5-11.3-11.3c0-0.9,0.1-1.8,0.3-2.6h0c2.9,0,5.7-1.2,7.8-3.2
           l0.5-0.5l0.5,0.5c2.1,2.1,4.9,3.2,7.8,3.2h5.3C23.1,10.2,23.3,11.1,23.3,12z"
      />
      <circle cx="16.3" cy="12.8" r="1.3" />
      <circle cx="7.5" cy="12.8" r="1.3" />
      <path className="st1" d="M7.1,16.9c1,1.5,2.8,2.5,4.8,2.5s3.7-1,4.8-2.5" />
    </g>
  </svg>
);

export default ProfileIcon;
