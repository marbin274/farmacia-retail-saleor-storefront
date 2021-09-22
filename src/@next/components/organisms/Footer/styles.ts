import { ContainerStyle, mediaUp, styled } from '@styles';
import { aunaGrey60, containerWidth } from '@temp/@next/globalStyles/constants';

export const FooterWrapper = styled.footer`
  padding: 0;
  padding-top: 4.063rem;

  ${mediaUp.largeScreen`
    padding-top: 5.625rem;
  `};
`;

export const Container = styled.div`
  ${ContainerStyle};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: 4rem;
  flex-direction: column;

  div:not(:last-of-type) {
    padding-right: 3rem;
  }

  ${mediaUp.xSmallScreen`
    padding-left: 4.563rem;
  `}

  ${mediaUp.largeScreen`
    padding-left: 1rem;
    flex-direction: row;
  `}
`;

export const SectionContent = styled.div`
  p {
    color: ${aunaGrey60};
    font-size: 0.775rem;
    font-weight: 300;
    display: block !important;
    a {
      text-decoration: none;
      color: ${aunaGrey60};
      font-size: 0.775rem;
      font-weight: 300;
    }
  }
`;
export const MailToImg = styled.img`
  width: 0.875rem;
  height: 0.5625rem;
  display: inline-block;
  vertical-align: middle;
  margin-left: 0.3125rem;
`;

export const PhoneImg = styled.img`
  margin-right: 0.625rem;
`;

export const ContainerTermsPolicy = styled.div`
  border-top: 0.0625rem solid rgba(255, 255, 255, 0.2);
  margin-top: 4.375rem;
`;

export const ContentTerms = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.5rem 0;
  flex-direction: column;

  ${mediaUp.largeScreen`
    width: ${containerWidth};
    flex-direction: row;
    height: 6rem;
    padding: 0 1rem;
    
  `}
`;

export const Privacy = styled.div`
  font-size: 0.775rem;
`;

export const Copyright = styled.div`
  color: rgba(255, 255, 255, 0.5);
`;
