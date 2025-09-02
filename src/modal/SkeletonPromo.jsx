import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonPromo = (props) => (
  <ContentLoader
    speed={2}
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="4" ry="4" width="100%" height="40%" />

    <rect x="15%" y="45%" rx="3" ry="3" width="70%" height="7%" />

    <rect x="10%" y="60%" rx="3" ry="3" width="80%" height="4%" />
    <rect x="10%" y="67%" rx="3" ry="3" width="80%" height="4%" />
    <rect x="10%" y="74%" rx="3" ry="3" width="80%" height="4%" />

    <rect x="5%" y="85%" rx="5" ry="5" width="40%" height="10%" />
  </ContentLoader>
);

export default SkeletonPromo;
