import { AsyncThunk } from '@reduxjs/toolkit';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAppDispatch } from '../hooks';

interface DataRowProps<T> {
  entity: T,
  patchEntity: AsyncThunk<any, T, object>,
  deleteEntity: AsyncThunk<number, number, object>
};

function DataRow<T extends { id: number, [key: string]: any }> ({ entity, patchEntity, deleteEntity }: DataRowProps<T>) {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<T>(entity);

  const editablePropChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const editablePropBlurHandler = () => {
    dispatch(patchEntity(data));
  };

  const deleteBtnClickHandler = () => {
    dispatch(deleteEntity(data.id))
  }

  return (
    <tr>
      {Object.entries(entity).map((entry, i) => {
        if (entry[0] === 'id') {
          return <td key={i}>{entry[1]}</td>
        } else {
          return <td key={i}>
            <input type="text" name={entry[0]} value={entry[1]} onChange={editablePropChangeHandler} onBlur={editablePropBlurHandler} />
          </td>
        };
      })}
      <td>
        <Button onClick={deleteBtnClickHandler}>Удалить</Button>
      </td>
    </tr>
  );
};

export default DataRow;