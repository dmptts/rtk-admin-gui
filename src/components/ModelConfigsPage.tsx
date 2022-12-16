import { useEffect } from 'react';
import { addModelConfig, deleteModelConfig, fetchModelConfigs, patchModelConfig } from '../api/modelConfigs';
import { ModelConfig, ModelConfigPostData } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectors } from '../store/modelConfigsSlice';
import AddDataForm from './AddDataForm';
import Container from './Container';
import DataTable from './DataTable';
import PageHeader from './PageHeader';

export default function ModelConfigsPage () {
  const dispatch = useAppDispatch();
  const configs = useAppSelector(selectors.selectAll);
  const error = useAppSelector((state) => state.models.error);

  const getModelsKeys = () => {
    return Object.keys(configs[0]).filter((key) => key !== 'id');
  };

  useEffect(() => {
    dispatch(fetchModelConfigs());
  }, [dispatch])

  return (
    <>
      <PageHeader />
      <Container>
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
            error={error}
          />
        }
      </Container>
    </>
  );
};