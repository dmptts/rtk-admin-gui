import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import SpinnerIcon from '../img/icon-spinner.svg';

const SpinnerContainer = styled.div`
  padding-top: 250px;
  padding-bottom: 250px;
`;

export default function Spinner () {
  return (
    <SpinnerContainer>
      <SVG src={SpinnerIcon} width={100} height={100} />
    </SpinnerContainer>
  );
};