import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components'

const StyledButton = styled.button<{ orange?: boolean }>`
  padding-top: 7px;
  padding-bottom: 8px;
  padding-left: 12px;
  padding-right: 12px;
  
  font-size: 20px;
  font-weight: 500;

  color: #ffffff;

  background-color: var(--color-brand-orange);
  border: none;
  border-radius: 5px;
  cursor: pointer;

  transition: 0.3s ease-in all;

  svg {
    stroke: #ffffff;
  }

  &:hover {
    background-color: #d33706;
  }

  &:active {
    background-color: #b12f01;
  }

  &:disabled,
  &[disabled] {
    background-color: #ff5733;
  }
`;

export default function Button (props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <StyledButton { ...props }>{ props.children }</StyledButton>
  );
};