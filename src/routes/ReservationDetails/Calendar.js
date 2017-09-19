import React, {Component} from 'react';
import DayPicker from 'react-day-picker';
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux';

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.peopleSelect = [];

    for (let i = this.props.minPartySize; i <= this.props.maxPartySize; i++) {
      this.peopleSelect.push(<option key={`people-select-${i}`} value={i}>{i}</option>)
    }
  }

  componentWillMount() {
    // console.log('this.this.props', this.props);
    // if (this.props.resetForm) {
    //   this.props.reset();
    //   this.props.initialize(this.props.initialValues);
    // }
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
      maxPartySizeModal,

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
        <Field name="people" component="select" onChange={handlePeopleChange}>
          <option disabled>No. of people</option>
          {this.peopleSelect}
          {maxPartySizeModal && <option value='maxPartySizeModal'>{this.props.maxPartySize + 1}+</option>}
        </Field>
        <Field name="sitting" component="select" onChange={handleSittingChange}>
          <option disabled>Sitting</option>
          {services.map(svc => <option key={svc.ServiceId} value={svc.ServiceId}>{svc.Name}</option>)}
        </Field>
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

export default connect(mapStateToProps)(reduxForm({
  form: 'reservationDetails',
  destroyOnUnmount: false
})(Calendar))
