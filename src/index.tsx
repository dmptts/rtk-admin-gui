import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';
import GlobalStyles from './global-styles';
import Alert from './components/Alert';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Alert />
      <App />
    </Provider>
    <GlobalStyles />
  </React.StrictMode>
);
