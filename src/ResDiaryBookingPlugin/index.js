import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {ResDiaryinit} from '../actions';
import {connect} from 'react-redux';


const Home = () => <div>Home Page</div>;
const Calendar = () => <div>Calendar Page</div>;

class ResDiaryBookingPlugin extends Component {
  constructor(props) {
    super(props);
    const {ResDiaryinit, tokenRequest, proxy, restaurant} = props;

    ResDiaryinit(tokenRequest, proxy, restaurant);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/reservations' component={Home} />
          <Route path='/reservations/calendar' component={Calendar} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(null, {ResDiaryinit})(ResDiaryBookingPlugin);
