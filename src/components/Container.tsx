import styled from 'styled-components';

const StyledContainer = styled.div`
  min-width: 1280px;
  margin: 0 auto;
  padding-left: 60px;
  padding-right: 60px;
`;

interface IContainerProps {
  children?: React.ReactNode
}

function Container ({children}: IContainerProps) {
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  );
};

export default Container;