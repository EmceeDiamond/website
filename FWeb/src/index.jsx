import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import AppProvider from './AppProvider.jsx'
import { store } from './storeProvider/store.js';

ReactDOM.createRoot
(document.getElementById('root')).render(
  <Provider store={ store }>
      <AppProvider />
  </Provider>
);

