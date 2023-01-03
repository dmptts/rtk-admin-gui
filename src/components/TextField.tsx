import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { visuallyHidden } from '../global-styles';

const TextFieldWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label<{ hideLabel: boolean }>`
  margin-bottom: 5px;

  ${({ hideLabel }) => hideLabel && visuallyHidden}
`;

const StyledTextField = styled.input<{ width?: number }>`
  width: ${({ width }) => width ? `${width}px` : '100%'};
  min-width: 170px;
  margin-bottom: 20px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 10px;
  padding-right: 10px;

  border: 1px solid #c0c0c0;
  border-radius: 3px;
  background-color: transparent;
  outline: none;

  &:hover,
  &:focus {
    border-color: var(--color-brand-orange);
  }
`;

const InputErrorMsg = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;

  font-size: 12px;
  color: #ff6347;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string,
  touched?: boolean,
  hideLabel?: boolean,
  labelText?: string,
  width?: number,
};

export default function TextField (props: InputProps) {
  const {
    id,
    labelText,
    hideLabel = false,
    error,
    touched,
    width,
  } = props;

  return (
    <TextFieldWrapper>
      {
        labelText &&
        <Label htmlFor={id} hideLabel={hideLabel}>
          {labelText}
        </Label>
      }
      <StyledTextField
        type='text'
        width={width}
        { ...props }
      />
      { touched !== undefined ? 
          touched &&
          error &&
          <InputErrorMsg>{error}</InputErrorMsg> :
          error &&
          <InputErrorMsg>{error}</InputErrorMsg>
      }
    </TextFieldWrapper>
  );
};