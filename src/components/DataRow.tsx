import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAppDispatch } from '../hooks';

interface DataRowProps<T> {
  entity: T,
  patchEntity: any,
  deleteEntity: any,
};

function DataRow<T extends {id: number}> ({ entity, patchEntity, deleteEntity }: DataRowProps<T>) {
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
      {Object.entries(entity).map((entry) => {
        if (entry[0] === 'id') {
          return <td>{entry[1]}</td>
        } else {
          return <td>
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