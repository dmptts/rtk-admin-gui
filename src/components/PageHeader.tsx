import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from '../img/logo.png';
import LogoImg2x from '../img/logo@2x.png'

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1fr, 12);
  column-gap: 20px;
  align-items: center;

  min-width: 1280px;
  margin: 0 auto;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 60px;
  padding-right: 60px;
`;

const Logo = styled.img`
  grid-column: 1;
  width: 27px;
  height: 39px;
`;

const HeaderNav = styled.nav`
  grid-column: 2 / 10;
`;

const HeaderNavList = styled.ul`
  display: flex;
  column-gap: 40px;
  margin: 0;
  padding: 0;

  list-style: none;
`;

const HeaderNavLink = styled(Link)<{ $isActive: boolean }>`
  position: relative;

  display: block;

  font-size: 20px;
  color: #000000;

  background-color: ${({ $isActive }) => $isActive
    ? 'var(--color-bg-active-nav-link)'
    : 'transparent'};

  transition: 0.3s ease-in all;

  &::before {
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';

    display: ${({ $isActive }) => $isActive
      ? 'block'
      : 'none'};
    width: 100%;
    height: 2px;

    background-color: var(--color-brand-violet);
  }

  &:hover {
    color: ${({ $isActive }) => $isActive
      ? '#000000'
      : 'var(--color-brand-violet)'};
    cursor: ${({ $isActive }) => $isActive && 'default'};
  }
`;

export default function PageHeader () {
  const { pathname } = useLocation();

  return (
    <header>
      <HeaderContainer>
        <Link to={'/'}>
          <Logo src={LogoImg} srcSet={LogoImg2x} width='27' height='39' alt='Логотип Ростелеком' />
        </Link>
        <HeaderNav>
          <HeaderNavList>
            <li>
              <HeaderNavLink
                to={'/regions'}
                $isActive={pathname === '/regions'}
              >
                Регионы
              </HeaderNavLink>
            </li>
            <li>
              <HeaderNavLink
                to={'/gateways'}
                $isActive={pathname === '/gateways'}
              >
                Шлюзы
              </HeaderNavLink>
            </li>
            <li>
              <HeaderNavLink
                to={'/hosts'}
                $isActive={pathname === '/hosts'}
              >
                Хосты
              </HeaderNavLink>
            </li>
            <li>
              <HeaderNavLink
                to={'/configs'}
                $isActive={pathname === '/configs'}
              >
                Конфигурации
              </HeaderNavLink>
            </li>
          </HeaderNavList>
        </HeaderNav>
      </HeaderContainer>
    </header>
  );
};