import { useState } from 'react';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useAppDispatch } from '../hooks';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import Button from './Button';
import Input from './Input';
import { DataHeadingsTranslations, InputPlaceholders } from '../const';
import SVG from 'react-inlinesvg';
import PlusIcon from '../img/icon-plus.svg';
import { AnyObject } from 'yup/lib/types';
import { ObjectSchema } from 'yup';

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

const InputsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  
  margin-top: 25px;
  margin-bottom: 25px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const InputErrorMsg = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;

  font-size: 12px;
  color: #ff6347;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const StyledInput = styled(Input)`
  width: 240px;
  margin-bottom: 20px;
`

const ToggleButton = styled(Button)`
  width: 150px;

  svg {
    margin-bottom: -3px;
    margin-right: 10px;
  }
`;

const SubmitButton = styled(Button)`
  width: 150px;
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
  addEntity: AsyncThunk<any, Omit<T, 'id'>, object>,
  validationSchema: ObjectSchema<AnyObject>
};

export default function AddDataForm<T> ({ fields, addEntity, validationSchema }: addDataFormProps<T>) {
  const dispatch = useAppDispatch();
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const getInitialValues = () => {
    return fields.reduce((state, value) => {
      state[value as keyof {[key: string]: string}] = '';
      return state;
    }, {} as {[key: string]: string})
  };

  const formSubmitHandler = (values: { [key: string]: string } ) => {
    if (values) {
      dispatch(addEntity(values as T));
      setIsOpened(false);
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
            handleBlur,
          }) => <Form>
            <InputsContainer>
              {Object.entries(values).map((formField, i) => {
                return <InputWrapper key={i}>
                  
                  <Label htmlFor={`${formField[0]}-field`}>
                    {`${DataHeadingsTranslations[formField[0] as keyof typeof DataHeadingsTranslations]}:`}
                  </Label>
                  <StyledInput
                    type="text"
                    name={formField[0]}
                    id={`${formField[0]}-field`}
                    value={values[formField[1]]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={InputPlaceholders[formField[0] as keyof typeof InputPlaceholders]}
                  />
                  {
                    touched[formField[0]]
                    && errors[formField[0]]
                    && <InputErrorMsg>{errors[formField[0]]}</InputErrorMsg>
                  }
                </InputWrapper>
              })}
            </InputsContainer>

            <SubmitButton
              type='submit'
              disabled={!isValid || !dirty}
            >
              Отправить
            </SubmitButton>
          </Form>}
        </Formik>
      }
    </FormContainer>
  );
};
