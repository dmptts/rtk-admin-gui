import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function ErrorPage () {
  return(
    <ErrorContainer>
      <h1>Упс!</h1>
      <p>Произошла неожиданная ошибка</p>
    </ErrorContainer>
  );
};