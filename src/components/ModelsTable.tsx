import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { fetchModels } from '../api/models';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectors } from '../store/modelsSlice';
import Search from './Search';
import Model from './Model';
import { Model as ModelInterface } from '../const';

export type SearchStateI = {
  [key in keyof ModelInterface]: string;
};

function ModelsTable () {
  const dispatch = useAppDispatch();
  const models = useAppSelector(selectors.selectAll);
  const [searchState, setSearchState] = useState<SearchStateI | null>(null);

  const filterModels = (model: ModelInterface) => {
    if (searchState) {
      const results = [];

      for (const key in model) {
        if (searchState[key as keyof SearchStateI] === '') {
          results.push(true);
        } else if (model[key as keyof SearchStateI].toString().toLowerCase().includes(searchState[key as keyof SearchStateI].toLowerCase())) {
          results.push(true);
        } else {
          results.push(false);
        };
      };

      return results.every((result) => result === true) && model;
    };
  };

  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);

  useEffect(() => {
    if (models.length > 0) {
      setSearchState(
        Object.keys(models[0]).reduce((state, key) => {
          state[key as keyof SearchStateI] = '';
          return state;  
        }, {} as SearchStateI)
      );
    }
  }, [models]);

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
        {searchState && models.length > 0 && <Search state={searchState} stateSetter={setSearchState} />}
        {models.filter((model) => filterModels(model)).map((model) => <Model key={model.id} model={model} />)}
      </tbody>
    </Table>
  );
};

export default ModelsTable;