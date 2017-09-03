import {applyMiddleware, createStore} from 'redux';
import reducers from './reducers';
import promiseMiddleware from 'redux-promise-middleware';
import {composeWithDevTools} from 'redux-devtools-extension';


export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(promiseMiddleware()))
);
