import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { fetchModels } from '../api/models';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectors } from '../store/modelsSlice';
import Model from './Model';

function ModelsTable () {
  const dispatch = useAppDispatch();
  const models = useAppSelector(selectors.selectAll);

  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);

  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Модель</th>
          <th>Регион</th>
          <th>Конфигурация</th>
          <th>Логин</th>
          <th>Пароль</th>
          <th>Супер-пароль</th>
        </tr>
      </thead>
      <tbody>
        {models.map((model) => <Model key={model.id} model={model} />)}
      </tbody>
    </Table>
  );
};

export default ModelsTable;