import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Search from './Search';
import TablePagination from './TablePagination';
import DataRow from './DataRow';
import { AsyncThunk } from '@reduxjs/toolkit';

export type SearchStateI<I> = {
  [key in keyof I]: string;
};

interface DataTableProps<T> {
  data: T[],
  patchEntity: AsyncThunk<any, T, object>,
  deleteEntity: AsyncThunk<number, number, object>
}

function DataTable<T extends { id: number, [key: string]: any }> ({ data, patchEntity, deleteEntity }: DataTableProps<T>) {
  const itemsPerPage = 5;
  const [searchState, setSearchState] = useState<{[key in keyof T]: string} | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<T[] | null>(null);

  useEffect(() => {
    if (data.length > 0) {
      setSearchState(
        Object.keys(data[0]).reduce((state, key) => {
          state[key as keyof T] = '';
          return state;  
        }, {} as {[key in keyof T]: string})
      );
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setFilteredData(data.filter((entity) => {
        if (searchState) {
          const results = [];
    
          for (const key in entity) {
            if (searchState[key] === '') {
              results.push(true);
            } else if (entity[key as keyof T].toString().toLowerCase().includes(searchState[key].toLowerCase())) {
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
  }, [data, searchState])

  useEffect(() => {
    if (filteredData) {
      setCurrentPage(1);
      setPagesCount(filteredData.length > itemsPerPage ? Math.ceil(filteredData.length / itemsPerPage): 0);
    };
  }, [filteredData])

  return (
    <>
      <Table>
        <thead>
          <tr>
            {filteredData && filteredData.length > 0 && Object.entries(filteredData[0]).map((entry, i) => <th key={i}>{entry[0]}</th>)}
          </tr>
        </thead>
        <tbody>
          {searchState && data.length > 0 && <Search state={searchState} stateSetter={setSearchState} />}
          {filteredData && filteredData.map((entity, i) => {
            if ((currentPage * itemsPerPage) - itemsPerPage < i + 1 && currentPage * itemsPerPage >= i + 1) {
              return <DataRow<T>
                key={entity.id}
                entity={entity}
                patchEntity={patchEntity}
                deleteEntity={deleteEntity}
              />
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

export default DataTable;