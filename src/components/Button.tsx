import styled from 'styled-components'

const StyledButton = styled.button<{ orange?: boolean }>`
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 10px;
  padding-right: 10px;
  
  color: #ffffff;

  background-color: var(--color-brand-orange);
  border: none;
  border-radius: 5px;
  cursor: pointer;

  transition: 0.3s ease-in all;

  &:hover {
    background-color: #d33706;
  }

  &:active {
    background-color: #b12f01;
  }
`;

interface ButtonProps {
  children: React.ReactNode,
  onClick: () => void,
}

export default function Button ({ children, onClick }: ButtonProps) {
  return (
    <StyledButton onClick={onClick}>{ children }</StyledButton>
  );
};