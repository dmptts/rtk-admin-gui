import styled from 'styled-components';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useAppDispatch } from '../hooks';
import { IPatchData, sortPropertiesByTemplate } from '../utils';
import CloseIcon from '../img/icon-close.svg';
import SVG from 'react-inlinesvg';
import { Formik, FormikErrors } from 'formik';
import { DataHeadingsTranslations } from '../const';
import { ObjectSchema } from 'yup';
import { AnyObject } from 'yup/lib/types';
import TextField from './TextField';

const TableCell = styled.td`
  &:first-child {
    padding-left: 20px;
  }

  &:last-child {
    padding-right: 20px;
  }
`;

const TextWrapper = styled.div`
  margin-bottom: 20px;
`;

const DeleteBtn = styled.button`
  display: block;
  width: 16px;
  height: 16px;
  margin: 0;
  margin-bottom: 4px;
  padding: 0;

  font-size: 0;

  border: none;
  background-color: transparent;
  cursor: pointer;

  transform: translateY(-50%);

  svg {
    width: 16px;
    height: 16px;

    stroke: var(--color-text-main);
  }

  &:hover svg {
    stroke: var(--color-brand-orange);
  }

  &:active svg {
    stroke: var(--color-brand-violet);
  }
`;

interface IDataRowProps<T extends { [key: string]: any; id: number; }> {
  entity: T,
  patchEntity: AsyncThunk<any, IPatchData<T>, object>,
  deleteEntity: AsyncThunk<number, number, object>,
  validationSchema: ObjectSchema<AnyObject>,
};

export default function DataRow
  <T extends { id: number, [key: string]: any }> ({
    entity,
    patchEntity,
    deleteEntity,
    validationSchema
  }: IDataRowProps<T>) {
  const dispatch = useAppDispatch();
  
  const deleteBtnClickHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    dispatch(deleteEntity(id));
  };

  const inputBlurHandler = (
    e: React.FocusEvent<HTMLInputElement>,
    err: FormikErrors<T>
  ) => {
    if (!err) {
      if (e.target.value !== entity[e.target.name].toString()) {
        dispatch(patchEntity({
          id: entity.id,
          payload: {
            [e.target.name]: e.target.value,
          },
        } as unknown as IPatchData<T>));
      }
    }
  };

  return (
    <tr>
      <Formik
        initialValues={entity}
        validateOnChange={true}
        validationSchema={validationSchema}
        // TODO: Найти способ избавиться от onSubmit. Formik считает это обязательным пропом.
        onSubmit={() => {}}
      >
        {({
            values,
            errors,
            handleChange,
          }) => 
            <>
              {Object.entries(values)
                .sort((a, b) => sortPropertiesByTemplate(a[0], b[0]))
                .map((formField, i) => {
                  if (formField[0] === 'id') {
                    return <TableCell key={i}>
                      <TextWrapper>{formField[1]}</TextWrapper>
                    </TableCell>
                  } else {
                    return <TableCell key={i}>
                      <TextField
                        id={`${formField[0]}-field-${i}`}
                        name={formField[0]}
                        value={formField[1]}
                        onChange={handleChange}
                        onBlur={(e) => inputBlurHandler(e, errors[formField[0]] as FormikErrors<T>)}
                        error={errors[formField[0]] as string}
                        labelText={DataHeadingsTranslations[formField[0] as keyof typeof DataHeadingsTranslations]}
                        hideLabel={true}
                      />
                    </TableCell>
                  };
              })}
              <TableCell>
                <DeleteBtn
                  type='button'
                  onClick={(e) => deleteBtnClickHandler(e, values.id)}
                >
                  <SVG src={CloseIcon} width={20} height={20} />
                  Удалить
                </DeleteBtn>
              </TableCell>
            </>
          }
      </Formik>
    </tr>
  );
};
