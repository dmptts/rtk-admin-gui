import { useEffect } from 'react';
import { addModelConfig, deleteModelConfig, fetchModelConfigs, patchModelConfig } from '../api/modelConfigs';
import { ModelConfig, ModelConfigPostData } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectors } from '../store/modelConfigsSlice';
import AddDataForm from './AddDataForm';
import DataTable from './DataTable';

function ModelConfigsPage () {
  const dispatch = useAppDispatch();
  const configs = useAppSelector(selectors.selectAll);

  const getModelsKeys = () => {
    return Object.keys(configs[0]).filter((key) => key !== 'id');
  };

  useEffect(() => {
    dispatch(fetchModelConfigs());
  }, [dispatch])

  return (
    <>
      {
        configs && configs.length > 0 && <AddDataForm<ModelConfigPostData>
          fields={getModelsKeys() as Array<keyof ModelConfigPostData>}
          addEntity={addModelConfig}
        />
      }
      {
        configs && <DataTable<ModelConfig>
          data={configs}
          patchEntity={patchModelConfig}
          deleteEntity={deleteModelConfig}
        />
      }
    </>
  )
}

export default ModelConfigsPage;