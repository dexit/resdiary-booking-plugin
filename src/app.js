import {BrowserRouter, Route} from 'react-router-dom';
import {render} from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import store from './store';

const container = document.getElementById('resdiary-booking');
const HomePage = () => <div>Home Page</div>
const UsersPage = () => <div>Users Page</div>

const App = (props) => {
  console.log('pp', props);
  return (<Provider store={store}>
    <BrowserRouter>
      <div className={props.keyww}>
        <Route path="/" exact component={HomePage}/>
        <Route path="/users" component={UsersPage}/>
      </div>
    </BrowserRouter>
  </Provider>)
};

if (module.hot) {
  module.hot.accept();
}

render(<App {...container.dataset}/>, container);