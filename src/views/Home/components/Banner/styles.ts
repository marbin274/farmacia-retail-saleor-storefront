import { mediaUp, styled } from "@temp/@next/globalStyles";

export const BannerWrapper = styled.div`
  aspect-ratio: 360 / 460;
  ${mediaUp.smallScreen`
      aspect-ratio: 1920 / 500;
    `}
`;
