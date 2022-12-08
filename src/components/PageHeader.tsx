import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from '../img/logo.png';
import LogoImg2x from '../img/logo@2x.png'

const Header = styled.header`
  background-color: var(--color-bg-header-main);
`;

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1fr, 12);
  column-gap: 20px;
  align-items: center;

  min-width: 1280px;
  margin: 0 auto;
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
  margin: 0;
  padding: 0;

  list-style: none;
`;

const HeaderNavLink = styled(Link)<{ $isActive: boolean }>`
  display: block; 
  padding-top: 24px;
  padding-bottom: 24px;
  padding-left: 20px;
  padding-right: 20px;
  
  font-size: 20px;
  background-color: ${({ $isActive }) => $isActive
    ? 'var(--color-bg-active-nav-link)'
    : 'transparent'};
`;

export default function PageHeader () {
  const { pathname } = useLocation();

  return (
    <Header>
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
    </Header>
  );
};