import { Link } from 'react-router-dom';
import Header from './PageHeader';

export default function MainPage () {
  return (
    <>
      <Header />
      <h1>Выберите одну из таблиц:</h1>
      <ul>
        <li>
          <Link to={'/regions'}>Регионы</Link>
        </li>
        <li>
          <Link to={'/gateways'}>Шлюзы</Link>
        </li>
        <li>
          <Link to={'/hosts'}>Хосты</Link>
        </li>
        <li>
          <Link to={'/configs'}>Конфигурации</Link>
        </li>
      </ul>
    </>
  );
};