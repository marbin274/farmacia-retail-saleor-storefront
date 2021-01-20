import { media, styled } from "@styles";
import {
  aunaBrand3,
  white,
  aunaInteractive,
  aunaError,
  smallFontSize,
  smallFontWeight,
} from "@styles/constants";

export const AddressForm = styled.form`
  width: 100%;

  .privacyAndPolicies {
    margin-top: 1rem;
    width: 100%;
    svg {
      margin-top: 0.4rem;
    }
    ${media.smallScreen`
      width: 100%;
    `}

    a {
      color: ${aunaInteractive};
    }
  }

  .additionals {
    margin-top: 2rem;
    width: 100%;
    ${media.smallScreen`
      width: 100%;
    `}

    a {
      color: ${aunaInteractive};
    }
  }

  .labelValidation {
    color: ${aunaError};
    font-size: ${smallFontSize};
    font-weight: ${smallFontWeight};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const RowWithTwoCells = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > div {
    width: calc(50% - ${props => props.theme.spacing.fieldSpacer} / 2);
    ${media.smallScreen`
      width: 100%;
    `}
  }
`;

export const RowWithOneCell = styled.div`
  width: 100%;
`;

export const FieldsGroup = styled.div`
  padding-top: 1rem;
  width: 100%;
`;

export const GroupLabel = styled.div`
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const GroupLabelIndex = styled.span`
    display: inline-block;
    color: ${white};
    background-color: ${aunaBrand3}
    border-radius: 5rem;
    height: 1.9rem;
    padding: 0.4rem;
    text-align: center;
    width: 1.9rem;
`;

export const GroupLabelTitle = styled.span`
  font-weight: bolder;
  padding-left: 1rem;
`;
