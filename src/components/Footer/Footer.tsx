import "./scss/index.scss";

import * as React from "react";

// TODO: Uncomment as soon as we need social media information 
// import { SocialMediaIcon } from "..";
// import { SOCIAL_MEDIA } from "../../core/config";
import Nav from "./Nav";


const Footer: React.FC = () => (
  <div className="footer" id="footer">
    {/* <div className="footer__favicons container">      
      {SOCIAL_MEDIA.map(medium => (
        <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
      ))}
    </div> */}
    <Nav />
  </div>
);

export default Footer;
