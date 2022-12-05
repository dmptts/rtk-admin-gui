import { useEffect } from 'react';
import { deleteModelConfig, fetchModelConfigs, patchModelConfig } from '../api/modelConfigs';
import { Model } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectors } from '../store/modelConfigsSlice';
import DataTable from './DataTable';

function ModelConfigsPage () {
  const dispatch = useAppDispatch();
  const configs = useAppSelector(selectors.selectAll);

  useEffect(() => {
    dispatch(fetchModelConfigs());
  }, [dispatch])

  return (
    <>
      {configs && <DataTable<Model>
        data={configs}
        patchEntity={patchModelConfig}
        deleteEntity={deleteModelConfig}
      />}
    </>
  )
}

export default ModelConfigsPage;