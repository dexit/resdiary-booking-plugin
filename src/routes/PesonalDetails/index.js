import React from 'react';

const PersonalDetails = props => {
  return (
    <section id="personal-details">
      <div>
        <input type="text" placeholder="First Name"/>
        <input type="text" placeholder="Last Name"/>
        <input type="email" placeholder="Email Address"/>
        <input type="tel" placeholder="Telephone Number"/>
      </div>
      <div>
        <textarea></textarea>
      </div>
    </section>
  );
};

export default PersonalDetails;
