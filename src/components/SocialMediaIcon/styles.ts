import { styled } from "@styles";

export const SocialIconWrapper = styled.a`
  svg * {
    transition: 0.3s;
  }

  &:hover {
    svg * {
      fill: $turquoise;
    }
    path {
      fill: $white;
    }
  }
  &:active {
    svg * {
      fill: $darkGreen2;
    }
    path {
      fill: $white;
    }
  }
`;
