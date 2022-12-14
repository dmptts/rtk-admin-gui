import React, { useCallback, useEffect, useState } from 'react';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useAppDispatch } from '../hooks';
import Button from './Button';
import Input from './Input';
import styled from 'styled-components';
import { visuallyHidden } from '../global-styles';
import { TableHeadings } from '../const';
import SVG from 'react-inlinesvg';
import PlusIcon from '../img/icon-plus.svg';

const FormContainer = styled.div<{ isOpened: boolean }>`
  display: flex;
  flex-direction: column;

  margin-bottom: 20px;
  padding: 20px;

  border-radius: 20px;
  background-color: ${({ isOpened }) => isOpened
    ? 'var(--color-table-bg)'
    : 'transparent'
  };
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`

const Label = styled.label`
  ${visuallyHidden}
`;

const ToggleButton = styled(Button)`
  width: 150px;
  align-self: flex-end;

  svg {
    margin-bottom: -3px;
    margin-right: 10px;
  }
`;

const SubmitButton = styled(Button)`
  width: 150px;
  margin-left: auto;
  background-color: #29a829;

  &:hover {
    background-color: #1f811f;
  }
`;

interface addDataFormProps<T> {
  fields: Array<keyof T>,
  addEntity: AsyncThunk<any, T, object>,
};

export default function AddDataForm<T> ({ fields, addEntity }: addDataFormProps<T>) {
  const dispatch = useAppDispatch();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [formState, setFormState] = useState<{[key: string]: string} | null>(null);

  const getInitialFormState = useCallback(() => {
    setFormState(
      fields.reduce((state, value) => {
        state[value as keyof {[key: string]: string}] = '';
        return state;
      }, {} as {[key: string]: string})
    );
  }, [fields]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState) {
      dispatch(addEntity(formState as T));
    };
  };

  useEffect(() => {
    if (fields) {
      getInitialFormState();
    };
  }, [fields, getInitialFormState]);
  
  return (
    <FormContainer isOpened={isOpened}>
      {
        <ToggleButton onClick={() => setIsOpened(!isOpened)}>
          {isOpened
            ? 'Отменить'
            : <>
              <SVG src={PlusIcon} width={18} height={18} />
              Добавить
            </>
          }
        </ToggleButton>
      }
      {
        isOpened && 
        <Form onSubmit={formSubmitHandler}>
          {formState && Object.entries(formState).map((formField, i) => {
            return <React.Fragment key={i}>
              <Label htmlFor={`${formField[0]}-field`}>{formField[0]}</Label>
              <Input
                type="text"
                name={formField[0]}
                id={`${formField[0]}-field`}
                value={formField[1]}
                onChange={inputChangeHandler}
                placeholder={TableHeadings[formField[0] as keyof typeof TableHeadings]}
                required
              />
            </React.Fragment>
          })}
          <SubmitButton type='submit'>Отправить</SubmitButton>
        </Form>
      }
    </FormContainer>
  );
};
