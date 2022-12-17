import { useEffect } from 'react';
import { addHost, deleteHost, fetchHosts, patchHost } from '../api/hosts';
import { Host, HostPostData } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectors } from '../store/hostsSlice';
import AddDataForm from './AddDataForm';
import Container from './Container';
import DataTable from './DataTable';
import PageHeader from './PageHeader';

export default function HostsPage () {
  const dispatch = useAppDispatch();
  const hosts = useAppSelector(selectors.selectAll);
  const error = useAppSelector((state) => state.hosts.error);

  const getHostsKeys = () => {
    return Object.keys(hosts[0]).filter((key) => key !== 'id');
  };

  useEffect(() => {
    dispatch(fetchHosts());
  }, [dispatch])

  return (
    <>
      <PageHeader />
      <Container>
        {
          hosts && hosts.length > 0 && <AddDataForm<HostPostData>
            fields={getHostsKeys() as Array<keyof HostPostData>}
            addEntity={addHost}
          />
        }
        {
          hosts && <DataTable<Host>
            data={hosts}
            patchEntity={patchHost}
            deleteEntity={deleteHost}
            error={error}
          />
        }
      </Container>
    </>
  );
};