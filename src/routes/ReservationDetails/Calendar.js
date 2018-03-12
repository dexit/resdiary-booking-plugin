import React, {Component} from 'react';
import DayPicker from 'react-day-picker';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import SelectInput from './SelectInput';
import Modernizr from 'modernizr';

class Calendar extends Component {
  state = {
    peopleSelect: [],
    servicesSelect: [],
    isTouch: Modernizr.touchevents
  };

  componentWillMount() {
    if (this.props.minPartySize) {
      this.loadPeople(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.minPartySize && nextProps.minPartySize) {
      this.loadPeople(nextProps);
    }
  }

  loadPeople(nextProps) {
    const peopleSelect = [];

    if (this.state.isTouch) {
      for (let i = nextProps.minPartySize; i <= nextProps.maxPartySize; i++) {
        peopleSelect.push(
          <option key={`people-select-${i}`} value={i}>
            {i}
          </option>
        );
      }
    } else {
      for (let i = nextProps.minPartySize; i <= nextProps.maxPartySize; i++) {
        peopleSelect.push({label: i, value: i});
      }

      if (this.props.maxPartySizeModal) {
        peopleSelect.push({label: `${nextProps.maxPartySize + 1}+`, value: 'maxPartySizeModal'});
      }
    }
    this.setState({peopleSelect});
  }

  render() {
    const {
      handleDayClick,
      disabledDays,
      toMonth,
      handleSubmit,
      services,
      selectedDay,
      people,
      sitting,
      handlePeopleChange,
      handleSittingChange,
      submitting,
      maxPartySizeModal
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <DayPicker
          onDayClick={handleDayClick}
          disabledDays={disabledDays}
          selectedDays={selectedDay}
          fromMonth={new Date()}
          toMonth={toMonth}
        />
        <ul id="calendar-key">
          <li id="unavailable">Unavailable</li>
          <li id="available">Available</li>
        </ul>
        {this.state.isTouch ? (
          <Field name="people" component="select" onChange={handlePeopleChange}>
            <option disabled>No. of people</option>
            {this.state.peopleSelect}
            {this.props.maxPartySize &&
            maxPartySizeModal && <option value="maxPartySizeModal">{this.props.maxPartySize + 1}+</option>}
          </Field>
        ) : (
           <Field
             name="people"
             placeholder="No. of people"
             options={this.state.peopleSelect}
             component={SelectInput}
             handleChange={handlePeopleChange}
           />
         )}
        {this.state.isTouch ? (
          <Field name="sitting" component="select" onChange={handleSittingChange}>
            <option disabled>Lunch/Dinner</option>
            {services.map(svc => (
              <option key={svc.ServiceId} value={svc.ServiceId}>
                {svc.Name}
              </option>
            ))}
          </Field>
        ) : (
           <Field
             name="sitting"
             placeholder="Lunch/Dinner"
             options={services.map(svc => ({label: svc.Name, value: svc.ServiceId}))}
             component={SelectInput}
             handleChange={handleSittingChange}
           />
         )}
        <button type="submit" disabled={!selectedDay || !people || !sitting || submitting}>
          Search Times
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.initialFormState
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'reservationDetails',
    destroyOnUnmount: false
  })(Calendar)
);
