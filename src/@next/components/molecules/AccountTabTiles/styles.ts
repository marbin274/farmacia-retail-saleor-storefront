import { media, styled } from '@styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;

export const TileWrapper = styled.div`
  height: auto;
  margin-bottom: 2.5rem;
  &:last-child {
    margin-bottom: 0rem;
  }
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  font-weight: ${(props) => props.theme.typography.extraBoldFontWeight};
  font-size: ${(props) => props.theme.typography.h4FontSize};
  height: 4rem;
  justify-content: space-between;
  padding-bottom: 1rem;
  width: 100%;
`;

export const HeaderSmall = styled(Header)`
  width: 100%;
  border-bottom: none;

  ${media.smallScreen`
    text-transform: none;
  `}
`;

export const AttributeWrapper = styled.div`
  margin-bottom: 1rem;
  text-align: center;
`;

export const Content = styled.div`
  padding: 0;
  width: 100%;
`;

export const ContentOneLine = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

export const ContentEditOneLine = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;

  > div {
    width: 100%;
  }

  ${media.largeScreen`
     flex-direction: column;
  `}
`;

export const ContentExtendInput = styled.div`
  width: 100%;
`;

export const FormButtons = styled.div`
  height: 5rem;
  padding-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  button:last-child {
    margin-left: 1.5rem;
  }

  ${media.largeScreen`
    justify-content: center;
  `}

  button {
    width: 8rem;
    span {
      margin-left: 0;
    }
  }
`;

export const Image = styled.img`
  margin: auto;
`;

export const Chip = styled.p`
  color: '#452FBA ';
  font-size: 0.75rem;
  font-weight: 500;
  background-color: '#EDEBFA';
  padding: 0.313rem;
  border-radius: 1rem;
  margin: 0.313rem;
`;
