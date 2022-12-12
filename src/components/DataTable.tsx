import { useCallback, useEffect, useState } from 'react';
// import Search from './Search';
import TablePagination from './TablePagination';
import DataRow from './DataRow';
import { AsyncThunk } from '@reduxjs/toolkit';
import { TableHeadings } from '../const';
import styled from 'styled-components';

const TableContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;

  border-radius: 20px;
  background-color: var(--color-table-bg);
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  padding: 20px;
  border: none;
  border-collapse: collapse;
`;

const TableHeading = styled.th`
  max-width: 210px;
  height: 60px;
  padding-right: 20px;

  font-size: 20px;
  font-weight: 500;
  color: var(--color-brand-violet);
  text-align: left;
  vertical-align: top;

  &:first-child {
    padding-left: 20px;
  }

  &:last-child {
    padding-right: 20px;
  }
`;

interface DataTableProps<T> {
  data: T[],
  patchEntity: AsyncThunk<any, T, object>,
  deleteEntity: AsyncThunk<number, number, object>,
}

function DataTable<T extends { id: number, [key: string]: any }> ({ data, patchEntity, deleteEntity }: DataTableProps<T>) {
  const itemsPerPage = 10;
  const [searchState, setSearchState] = useState<{[key in keyof T]: string} | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<T[] | null>(null);

  const getInitialSearchState = useCallback(() => {
    setSearchState(
      Object.keys(data[0]).reduce((state, key) => {
        state[key as keyof T] = '';
        return state;  
      }, {} as {[key in keyof T]: string})
    );
  }, [data]);

  const getTableHeadings = useCallback(() => {
    return data && data.length > 0 && Object.entries(data[0]).map((entry, i) => <TableHeading key={i}>{TableHeadings[entry[0] as keyof typeof TableHeadings]}</TableHeading>)
  }, [data]);

  const filterData = useCallback(() => {
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
  }, [data, searchState]);

  const getPagesCount = useCallback(() => {
    if (filteredData) {
      setPagesCount(filteredData.length > itemsPerPage ? Math.ceil(filteredData.length / itemsPerPage): 0);
    }
  }, [filteredData]);

  const renderData = useCallback(() => {
    return filteredData && filteredData.map((entity, i) => {
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
    })
  }, [currentPage, deleteEntity, filteredData, patchEntity])

  useEffect(() => {
    if (data.length > 0) {
      getInitialSearchState();
    }
  }, [data, getInitialSearchState]);

  useEffect(() => {
    if (data) {
      filterData();
    };
  }, [data, searchState, filterData])

  useEffect(() => {
    if (filteredData) {
      setCurrentPage(1);
      getPagesCount();
    };
  }, [filteredData, getPagesCount])

  return (
    <>
      <TableContainer>
        <Table cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              {getTableHeadings()}
            </tr>
          </thead>
          <tbody>
            {/* {searchState && data.length > 0 && <Search state={searchState} stateSetter={setSearchState} />} */}
            {renderData()}
          </tbody>
        </Table>
      </TableContainer>
      <TablePagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default DataTable;