import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { deleteModel, fetchModels, patchModel } from '../api/models';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectors } from '../store/modelsSlice';
import Search from './Search';
// import Model from './Model';
import TablePagination from './TablePagination';
import { Model as ModelInterface } from '../const';
import DataRow from './DataRow';

export type SearchStateI = {
  [key in keyof ModelInterface]: string;
};

function ModelsTable () {
  const itemsPerPage = 5;
  const dispatch = useAppDispatch();
  const models = useAppSelector(selectors.selectAll);
  const [searchState, setSearchState] = useState<SearchStateI | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<ModelInterface[] | null>(null);

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

  useEffect(() => {
    if (models) {
      setFilteredData(models.filter((entity) => {
        if (searchState) {
          const results = [];
    
          for (const key in entity) {
            if (searchState[key as keyof SearchStateI] === '') {
              results.push(true);
            } else if (entity[key as keyof SearchStateI].toString().toLowerCase().includes(searchState[key as keyof SearchStateI].toLowerCase())) {
              results.push(true);
            } else {
              results.push(false);
            };
          };
    
          return results.every((result) => result === true) && entity;
        } else {
          return false;
        }
      }));
    };
  }, [searchState, filteredData, models])

  useEffect(() => {
    if (filteredData) {
      setPagesCount(filteredData.length > itemsPerPage ? Math.ceil(filteredData.length / itemsPerPage): 0);
    };
  }, [filteredData])

  return (
    <>
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
          {filteredData && filteredData.map((model, i) => {
            if ((currentPage * itemsPerPage) - itemsPerPage < i + 1 && currentPage * itemsPerPage >= i + 1) {
              return <DataRow key={model.id} entity={model} patchEntity={patchModel} deleteEntity={deleteModel} />
            } else {
              return null;
            };
          })}
        </tbody>
      </Table>
      <TablePagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default ModelsTable;