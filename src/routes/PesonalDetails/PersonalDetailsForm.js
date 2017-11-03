import React from 'react';
import {Field, reduxForm} from 'redux-form'

const PersonalDetailsForm = () => {

  const handlePaste = e => e.preventDefault();

  return (
    <form id="personal-details-form">
      <div>
        <Field name="firstName" type="text" component="input" placeholder="First Name"/>
        <Field name="lastName" type="text" component="input" placeholder="Last Name"/>
        <Field name="email" type="text" component="input" placeholder="Email Address"/>
        <Field name="confirmEmail" type="text" component="input" placeholder="Confirm Email Address"
               onPaste={handlePaste}/>
        <Field name="tel" type="text" component="input" placeholder="Telephone Number"/>
      </div>
      <div>
        <Field name="specialRequests" component="textarea" placeholder="Special Requests"/>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'personalDetails',
  destroyOnUnmount: false,
})(PersonalDetailsForm);
