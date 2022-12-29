import { AsyncThunk, EntitySelectors } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { ObjectSchema } from 'yup';
import { AnyObject } from 'yup/lib/types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../store/store';
import { IPatchData } from '../utils';
import AddDataForm from './AddDataForm';
import Container from './Container';
import DataTable from './DataTable';
import PageHeader from './PageHeader';
import Spinner from './Spinner';

interface DataTableProps<T extends { [key: string]: any; id: number; }> {
  fetchAction: AsyncThunk<T[], void, object>,
  addAction: AsyncThunk<any, Omit<T, 'id'>, object>,
  patchAction: AsyncThunk<any, IPatchData<T>, object>,
  deleteAction: AsyncThunk<number, number, object>,
  selectors: EntitySelectors<T, RootState>,
  slice: "gateways" | "models" | "regions" | "hosts",
  validationSchema: ObjectSchema<AnyObject>
};

export default function DataTablePage<T extends {
  id: number,
  [key: string]: any 
}> ({
  fetchAction,
  addAction,
  patchAction,
  deleteAction,
  selectors,
  slice,
  validationSchema
}: DataTableProps<T>) {
  const dispatch = useAppDispatch();
  const entities = useAppSelector(selectors.selectAll);
  const error = useAppSelector((state) => state[slice].error);
  const loading = useAppSelector((state) => state[slice].loading);

  const getEntityKeys = () => {
    return Object.keys(entities[0]).filter((key) => key !== 'id');
  };

  useEffect(() => {
    dispatch(fetchAction());
  }, [dispatch, fetchAction])

  return(
    <>
      <PageHeader />
      <Container>
        {loading
          ? <Spinner />
          : <>
            {
              entities.length > 0 && <AddDataForm<T>
                fields={getEntityKeys() as Array<keyof Omit<T, 'id'>>}
                addEntity={addAction}
                validationSchema={validationSchema}
              />
            }
            {
              <DataTable<T>
                data={entities}
                patchEntity={patchAction}
                deleteEntity={deleteAction}
                error={error}
                validationSchema={validationSchema}
              />
            }
          </>
        }
      </Container>
    </>
  );
};