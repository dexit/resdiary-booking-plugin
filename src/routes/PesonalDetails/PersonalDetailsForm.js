import React from 'react';
import {Field, reduxForm} from 'redux-form';
import DatePickerField from './DatePickerField/DatePicker';
import SelectInput from '../ReservationDetails/SelectInput';
import Modernizr from 'modernizr';
import {connect} from 'react-redux';
import moment from 'moment/moment';

const PersonalDetailsForm = ({customerCodes}) => {
  const handlePaste = e => e.preventDefault();

  return (
    <form id="personal-details-form">
      <div>
        <Field name="firstName" type="text" component="input" placeholder="First Name"/>
        <Field name="lastName" type="text" component="input" placeholder="Last Name"/>
        <Field
          name="DOB"
          type={Modernizr.touchevents ? 'date' : 'text'}
          component={Modernizr.touchevents ? 'input' : DatePickerField}
          placeholder="Date Of Birth"
          {...(Modernizr.touchevents
            ? {
              min: moment()
                .subtract(100, 'years')
                .format('YYYY-MM-DD'),
              max: moment()
                .subtract(18, 'years')
                .format('YYYY-MM-DD')
            }
            : {})}
        />
        <Field name="email" type="text" component="input" placeholder="Email Address"/>
        <Field
          name="confirmEmail"
          type="text"
          component="input"
          placeholder="Confirm Email Address"
          onPaste={handlePaste}
        />
        <Field name="tel" type="text" component="input" placeholder="Telephone Number"/>
        {/*@CustomerCodes - uncomment below*/}
        {/*{Modernizr.touchevents ? (*/}
        {/*<Field name="HDYH" component="select">*/}
        {/*<option disabled>How Did You Hear About Us?</option>*/}
        {/*{customerCodes.map(({ Name, Id }) => (*/}
        {/*<option key={Id} value={Id}>*/}
        {/*{Name}*/}
        {/*</option>*/}
        {/*))}*/}
        {/*</Field>*/}
        {/*) : (*/}
        {/*<Field*/}
        {/*name="HDYH"*/}
        {/*placeholder="How Did You Hear About Us?"*/}
        {/*options={customerCodes.map(({ Name, Id }) => ({ label: Name, value: Id }))}*/}
        {/*component={SelectInput}*/}
        {/*/>*/}
        {/*)}*/}
      </div>
      <div>
        <Field name="specialRequests" component="textarea" placeholder="Special Requests"/>
      </div>
    </form>
  );
};

export default connect(state => ({
  customerCodes: state.customerCodes
  //@CustomerCodes - uncomment below
  // initialValues: { HDYH: 'How Did You Hear About Us?' }
}))(
  reduxForm({
    form: 'personalDetails',
    destroyOnUnmount: false
  })(PersonalDetailsForm)
);
