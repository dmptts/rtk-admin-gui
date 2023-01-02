import { useCallback, useEffect, useState } from 'react';
import Search from './Search';
import TablePagination from './TablePagination';
import DataRow from './DataRow';
import { IPatchData, sortPropertiesByTemplate } from '../utils';
import { AsyncThunk } from '@reduxjs/toolkit';
import { DataHeadingsTranslations } from '../const';
import styled from 'styled-components';
import { AnyObject } from 'yup/lib/types';
import { ObjectSchema } from 'yup';

const TableContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;

  border-radius: 20px;
  background-color: var(--color-table-bg);
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;

  border-spacing: 10px;
`;

const TableHeading = styled.th`
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

const LoadErrorMsg = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 15px;
  padding-right: 15px;
  
  font-size: 24px;
  color: var(--color-brand-orange);
  text-align: center;
`;

interface DataTableProps<T extends { [key: string]: any; id: number; }> {
  data: T[],
  patchEntity: AsyncThunk<any, IPatchData<T>, object>,
  deleteEntity: AsyncThunk<number, number, object>,
  error: null | string,
  validationSchema: ObjectSchema<AnyObject>,
};

export default function DataTable<T extends { id: number, [key: string]: any }> ({ 
  data,
  patchEntity,
  deleteEntity,
  error,
  validationSchema,
}: DataTableProps<T>) {
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
    return data && data.length > 0 && Object.entries(data[0])
      .sort((a, b) => sortPropertiesByTemplate(a[0], b[0]))
      .map((entry, i) => {
        return <TableHeading key={i}>
          {DataHeadingsTranslations[entry[0] as keyof typeof DataHeadingsTranslations]}
        </TableHeading>
      });
  }, [data]);

  const filterData = useCallback(() => {
      setFilteredData(data.filter((entity) => {
        if (searchState) {
          const results = [];
    
          for (const key in entity) {
            if (searchState[key] === undefined) {
              return false;
            } else if (searchState[key] === '') {
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
        };
      }));

  }, [data, searchState]);

  const getPagesCount = useCallback(() => {
    if (filteredData) {
      setPagesCount(filteredData.length > itemsPerPage ? Math.ceil(filteredData.length / itemsPerPage): 0);
    };
  }, [filteredData]);

  const renderData = useCallback(() => {
    return filteredData && filteredData.map((entity, i) => {
      if ((currentPage * itemsPerPage) - itemsPerPage < i + 1 && currentPage * itemsPerPage >= i + 1) {
        return <DataRow<T>
          key={entity.id}
          entity={entity}
          patchEntity={patchEntity}
          deleteEntity={deleteEntity}
          validationSchema={validationSchema}
        />
      } else {
        return null;
      };
    });
  }, [currentPage, deleteEntity, filteredData, patchEntity, validationSchema])

  useEffect(() => {
    if (data.length > 0 && !searchState) {
      getInitialSearchState();
    }
  }, [data, searchState, getInitialSearchState]);

  useEffect(() => {
    filterData();
  }, [searchState, filterData]);

  useEffect(() => {
    getPagesCount();
  }, [filteredData, getPagesCount]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pagesCount]);

  return (
    <>
      <TableContainer>
        {
        error ?
        <LoadErrorMsg>{error}</LoadErrorMsg> :
        <>
          <Table>
            <thead>
              <tr>
                {getTableHeadings()}
              </tr>
            </thead>
            <tbody>
              {searchState && data.length > 0 && <Search state={searchState} stateSetter={setSearchState} />}
              
              {renderData()}
            </tbody>
          </Table>
          <TablePagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
        }
      </TableContainer>
    </>
  );
};
