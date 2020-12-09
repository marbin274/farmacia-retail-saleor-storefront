import { styled } from "@styles";
import {aunaInteractive} from "@styles/constants";

export const EmailSpan = styled.span`
    color: ${aunaInteractive};
    font-size: 1em; 
    
    a {
      color: ${aunaInteractive};
    }
`

export const EmailIcon = styled.span`
  display: inline-block;
  padding-right: 0.5em;
  position: relative;
  top: 0.2em;
`
