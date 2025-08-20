import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="134" cy="136" r="125" />
    <rect x="0" y="296" rx="16" ry="16" width="280" height="22" />
    <rect x="0" y="340" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="446" rx="15" ry="15" width="75" height="35" />
    <rect x="150" y="446" rx="14" ry="14" width="132" height="35" />
  </ContentLoader>
);

export default Skeleton;
