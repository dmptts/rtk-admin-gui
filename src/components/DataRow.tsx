import styled from 'styled-components';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { sortPropertiesByTemplate } from '../utils';
import CloseIcon from '../img/icon-close.svg';
import SVG from 'react-inlinesvg';
import Input from './Input';

const TableCell = styled.td`
  padding-top: 10px;
  padding-bottom: 10px;

  &:first-child {
    padding-left: 20px;
  }

  &:last-child {
    padding-right: 20px;
  }
`;

const DeleteBtn = styled.button`
  display: block;
  width: 16px;
  height: 16px;
  margin: 0;
  margin-bottom: -14px;
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

interface DataRowProps<T> {
  entity: T,
  patchEntity: AsyncThunk<any, T, object>,
  deleteEntity: AsyncThunk<number, number, object>,
};

function DataRow<T extends { id: number, [key: string]: any }> ({ entity, patchEntity, deleteEntity }: DataRowProps<T>) {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<T>(entity);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const deleteBtnClickHandler = () => {
    dispatch(deleteEntity(data.id))
  };

  const inputBlurHandler = () => {
    dispatch(patchEntity(data));
  };

  const renderData = () => {
    return Object.entries(data)
      .sort((a, b) => sortPropertiesByTemplate(a[0], b[0]))
      .map((entry, i) => {
        if (entry[0] === 'id') {
          return <TableCell key={i}>{entry[1]}</TableCell>
        } else {
          return <TableCell key={i}>
            <Input
              type="text"
              name={entry[0]}
              value={entry[1]}
              onChange={inputChangeHandler}
              onBlur={inputBlurHandler}
            />
          </TableCell>
        };
      });
  };

  return (
    <tr>
      {renderData()}
      <TableCell>
        <DeleteBtn
          type='button'
          onClick={deleteBtnClickHandler}
        >
          <SVG src={CloseIcon} width={20} height={20} />
          Удалить
        </DeleteBtn>
      </TableCell>
    </tr>
  );
};

export default DataRow;