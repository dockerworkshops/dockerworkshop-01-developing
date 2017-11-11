import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import store from './store';

/* eslint-disable react/jsx-filename-extension */
const Root = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(Root, document.getElementById('dashboard-root'));

registerServiceWorker();
