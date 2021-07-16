import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
/* import logger from 'redux-logger'; */
import SimpleReactLightbox from 'simple-react-lightbox'
import rootReducer from './redux/reducers/_root.reducer';
import rootSaga from './redux/sagas/_root.saga'; 

import App from './components/App/App';

const sagaMiddleware = createSagaMiddleware();


const middlewareList = /*process.env.NODE_ENV === 'development' ?
   [sagaMiddleware, logger] : */
  [sagaMiddleware];

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewareList),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <SimpleReactLightbox>
  <Provider store={store}>
    <App />
  </Provider>
  </SimpleReactLightbox>,
  document.getElementById('react-root')
);
