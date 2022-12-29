import styled from 'styled-components';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useAppDispatch } from '../hooks';
import { IPatchData, sortPropertiesByTemplate } from '../utils';
import CloseIcon from '../img/icon-close.svg';
import SVG from 'react-inlinesvg';
import Input from './Input';
import { Formik, FormikErrors } from 'formik';
import { DataHeadingsTranslations } from '../const';
import { visuallyHidden } from '../global-styles';
import { ObjectSchema } from 'yup';
import { AnyObject } from 'yup/lib/types';

const TableCell = styled.td`
  &:first-child {
    padding-left: 20px;
  }

  &:last-child {
    padding-right: 20px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const TextWrapper = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  ${visuallyHidden}
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;
`;

const InputErrorMsg = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;

  font-size: 12px;
  color: #ff6347;
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

interface DataRowProps<T extends { [key: string]: any; id: number; }> {
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
  }: DataRowProps<T>) {
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
      dispatch(patchEntity({
        id: entity.id,
        payload: {
          [e.target.name]: e.target.value
        }
      } as unknown as IPatchData<T>));
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
                      <InputWrapper>
                        <Label>
                          {DataHeadingsTranslations[formField[0] as keyof typeof DataHeadingsTranslations]}
                        </Label>
                        <StyledInput
                          type="text"
                          name={formField[0]}
                          value={formField[1]}
                          onChange={handleChange}
                          onBlur={(e) => inputBlurHandler(e, errors[formField[0]] as FormikErrors<T>)}
                        />
                        {
                          errors[formField[0]] &&
                          <InputErrorMsg>
                            {errors[formField[0]] as string}
                          </InputErrorMsg>
                        }
                      </InputWrapper>
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
