import {render} from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import ResDiaryBookingPlugin from './ResDiaryBookingPlugin';
import './assets/styles/_p-form.scss';

const container = document.getElementById('resdiary-reservations');

if (module.hot) {
  module.hot.accept();
}

render(
  <Provider store={store}>
    <ResDiaryBookingPlugin {...container.dataset} />
  </Provider>,
  container
);
