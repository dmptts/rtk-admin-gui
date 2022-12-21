import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from './Container';
import Header from './PageHeader';

const StyledLink = styled(Link)`
  color: var(--color-brand-violet);

  &:hover,
  &:active {
    color: var(--color-brand-orange);
  }
`;

export default function MainPage () {
  return (
    <>
      <Header />
      <Container>
        <h1>Выберите одну из таблиц:</h1>
        <ul>
          <li>
            <StyledLink to={'/regions'}>Регионы</StyledLink>
          </li>
          <li>
            <StyledLink to={'/gateways'}>Шлюзы</StyledLink>
          </li>
          <li>
            <StyledLink to={'/hosts'}>Хосты</StyledLink>
          </li>
          <li>
            <StyledLink to={'/configs'}>Конфигурации</StyledLink>
          </li>
        </ul>
      </Container>
    </>
  );
};