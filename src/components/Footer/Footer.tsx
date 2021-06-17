import "./scss/index.scss";

import * as React from "react";

// TODO: Uncomment as soon as we need social media information
// import { SocialMediaIcon } from "..";
// import { SOCIAL_MEDIA } from "../../core/config";
import Nav from "./Nav";
import { useLocation } from "react-router-dom";

const Footer: React.FC = () => {
  const location = useLocation();
  const showFooter = !(
    location.pathname.includes("checkout") ||
    location.pathname.includes("order-finalized")
  );

  if (!showFooter) return <></>;

  return (
    <div className="footer" id="footer">
      {/* <div className="footer__favicons container">      
      {SOCIAL_MEDIA.map(medium => (
        <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
      ))}
    </div> */}
      <Nav />
    </div>
  );
};

export default Footer;
