import { styled } from "@styles";
import { aunaPrimary } from "@styles/constants";

export const Wrapper = styled.div`
  display: grid;
  grid-template-areas: "sidebar preview";
  height: 100%;
  grid-template-columns: 76px 1fr;
  grid-column-gap: 40px;
`;

export const Thumbnail = styled.div<{ activeThumbnail: boolean }>`
  width: 76px;
  display: flex;
  border-width: 4px;
  border-style: solid;
  border-color: ${props =>
    props.activeThumbnail === true ? aunaPrimary : "transparent"};
  justify-content: center;
  height: 100px;
  overflow: hidden;
  img {
    width: 100%;
    object-fit: contain;
  }

  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Button = styled.div`
  align-items: center;
  background-color: rgba(50, 50, 50, 0.3);
  cursor: pointer;
  display: flex;
  height: 50px;
  justify-content: center;
  position: absolute;
  width: 100%;
  z-index: 1;
`;

export const TopButton = styled(Button)`
  top: 0%;
  transform: rotate(180deg);
`;

export const BottomButton = styled(Button)`
  bottom: 0%;
`;

export const ThumbnailsContainer = styled.div`
  position: relative;
  background-color: #00b0ca;
  height: 519px;
  width: 536px;
  top: -104px;
  left: 0;
`;

// TODO: just for now Thumbnails are hidden, check with Cata
export const ThumbnailList = styled.div`
  display: none;
  position: relative;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    width: 0px;
  }

  ul {
    position: absolute;
    display: block;
    padding: 0;
    margin: 0;
  }
`;

export const Preview = styled.div`
  z-index: 2;
  grid-area: preview;
  height: 470px;
  width: 470px;
  overflow: hidden;
  img {
    max-height: 470px;
    width: 100%;
    object-fit: contain;
  }
`;
