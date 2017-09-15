import React from 'react';
import {Field, reduxForm} from 'redux-form'

const PersonalDetailsForm = () => {

  return (
    <form id="personal-details-form">
      <div>
        <Field name="firstName" type="text" component="input"/>
        <Field name="lastName" type="text" component="input"/>
        <Field name="email" type="text" component="input"/>
        <Field name="tel" type="text" component="input"/>
      </div>
      <div>
        <Field name="specialRequests" component="textarea"/>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'personalDetails',
  destroyOnUnmount: false,
})(PersonalDetailsForm);