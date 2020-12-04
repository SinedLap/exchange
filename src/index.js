import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import exchangeReducer from './redux/reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './redux/sagas'
import 'fontsource-roboto';

const saga = createSagaMiddleware()
const store = createStore(exchangeReducer, applyMiddleware(saga))
saga.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
