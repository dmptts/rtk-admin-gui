import { useEffect } from 'react';
import { addRegion, deleteRegion, fetchRegions, patchRegion } from '../api/regions';
import { Region, RegionPostData } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectors } from '../store/regionsSlice';
import AddDataForm from './AddDataForm';
import Container from './Container';
import DataTable from './DataTable';
import PageHeader from './PageHeader';

export default function ModelConfigsPage () {
  const dispatch = useAppDispatch();
  const regions = useAppSelector(selectors.selectAll);
  const error = useAppSelector((state) => state.regions.error);

  const getRegionsKeys = () => {
    return Object.keys(regions[0]).filter((key) => key !== 'id');
  };

  useEffect(() => {
    dispatch(fetchRegions());
  }, [dispatch])

  return (
    <>
      <PageHeader />
      <Container>
        {
          regions && regions.length > 0 && <AddDataForm<RegionPostData>
            fields={getRegionsKeys() as Array<keyof RegionPostData>}
            addEntity={addRegion}
          />
        }
        {
          regions && <DataTable<Region>
            data={regions}
            patchEntity={patchRegion}
            deleteEntity={deleteRegion}
            error={error}
          />
        }
      </Container>
    </>
  );
};