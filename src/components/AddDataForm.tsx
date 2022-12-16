import React, { useState } from 'react';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useAppDispatch } from '../hooks';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { validationSchema } from '../utils';
import { visuallyHidden } from '../global-styles';
import Button from './Button';
import Input from './Input';
import { DataHeadingsTranslations } from '../const';
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

const StyledForm = styled(Form)`
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

  &:disabled,
  &[disabled] {
    background-color: #d3d3d3;
    cursor: default;
  }
`;

interface addDataFormProps<T> {
  fields: Array<keyof T>,
  addEntity: AsyncThunk<any, T, object>,
};

export default function AddDataForm<T> ({ fields, addEntity }: addDataFormProps<T>) {
  const dispatch = useAppDispatch();
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const getInitialValues = () => {
    return fields.reduce((state, value) => {
      state[value as keyof {[key: string]: string}] = '';
      return state;
    }, {} as {[key: string]: string})
  };

  const formSubmitHandler = (values: {[key: string]: string} ) => {
    if (values) {
      dispatch(addEntity(values as T));
    };
  };
  
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
        isOpened
        && <Formik
          initialValues={getInitialValues()}
          validateOnBlur
          onSubmit={formSubmitHandler}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            dirty,
            isValid,
            handleChange,
          }) => <StyledForm>
            {Object.entries(values).map((formField, i) => {
              return <React.Fragment key={i}>
                {
                  touched[formField[0]]
                  && errors[formField[0]]
                  && <p>{errors[formField[0]]}</p>
                }
                <Label htmlFor={`${formField[0]}-field`}>{formField[0]}</Label>
                <Input
                  type="text"
                  name={formField[0]}
                  id={`${formField[0]}-field`}
                  value={values[formField[1]]}
                  onChange={handleChange}
                  placeholder={DataHeadingsTranslations[formField[0] as keyof typeof DataHeadingsTranslations]}
                />
              </React.Fragment>
            })}

            <SubmitButton
              type='submit'
              disabled={!isValid || !dirty}
            >
              Отправить
            </SubmitButton>
          </StyledForm>}
        </Formik>
      }
    </FormContainer>
  );
};
