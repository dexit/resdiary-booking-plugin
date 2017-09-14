import React from 'react';
import {Field, Form, reduxForm} from 'redux-form'

const PersonalDetailsForm = ({handleSubmit, createBooking}) => {

  return (
    <Form id="personal-details-form" onSubmit={handleSubmit(createBooking)}>
      <div>
        <Field name="firstName" type="text" component="input"/>
        <Field name="lastName" type="text" component="input"/>
        <Field name="email" type="text" component="input"/>
        <Field name="tel" type="text" component="input"/>
      </div>
      <div>
        <Field name="specialRequests" component="textarea"/>
      </div>
    </Form>
  );
};

export default reduxForm({
  form: 'personalDetails',
  destroyOnUnmount: false,
})(PersonalDetailsForm);