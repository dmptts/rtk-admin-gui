import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 170px;
  margin-right: 15px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 10px;
  padding-right: 10px;

  border: 1px solid var(--color-brand-violet);
  border-radius: 3px;
  background-color: transparent;
  outline: none;

  &:hover,
  &:focus {
    border-color: var(--color-brand-orange);
  }
`;

export default function Input (props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <StyledInput { ...props } />
  )
}