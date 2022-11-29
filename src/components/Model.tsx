import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { deleteModel, patchModel } from '../api/models';
import { Model as ModelInterface } from '../const';
import { useAppDispatch } from '../hooks';

interface ModelProps {
  model: ModelInterface
}

function Model ({model}: ModelProps) {
  const dispatch = useAppDispatch();
  const [modelData, setModelData] = useState(model);

  const editablePropChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setModelData({
      ...modelData,
      [e.target.name]: e.target.value,
    });
  };

  const editablePropBlurHandler = () => {
    dispatch(patchModel(modelData));
  };

  const deleteBtnClickHandler = () => {
    dispatch(deleteModel(modelData.id))
  }

  return (
    <tr>
      <td>{modelData.id}</td>
      <td>
        <input type="text" name="model" value={modelData.model} onChange={editablePropChangeHandler} onBlur={editablePropBlurHandler} />
      </td>
      <td>
        <input type="text" name="region" value={modelData.region} onChange={editablePropChangeHandler} onBlur={editablePropBlurHandler} />
      </td>
      <td>
        <input type="text" name="configuration" value={modelData.configuration} onChange={editablePropChangeHandler} onBlur={editablePropBlurHandler} />
      </td>
      <td>
        <input type="text" name="login" value={modelData.login} onChange={editablePropChangeHandler} onBlur={editablePropBlurHandler} />
      </td>
      <td>
        <input type="text" name="password" value={modelData.password} onChange={editablePropChangeHandler} onBlur={editablePropBlurHandler} />
      </td>
      <td>
        <input type="text" name="super_password" value={modelData.super_password} onChange={editablePropChangeHandler} onBlur={editablePropBlurHandler} />
      </td>
      <td>
        <Button onClick={deleteBtnClickHandler}>Удалить</Button>
      </td>
    </tr>
  );
};

export default Model;