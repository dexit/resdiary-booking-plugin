import React from 'react';
import {connect} from 'react-redux';

const Footer = ({error}) => {
  return (
    <footer>
      <button id="prev-button" type="button">Previous</button>
      <button id="next-button" type="button">Next</button>
      <button id="confirm-button" type="submit">Confirm</button>
      {error && <p id="error-message">Oops! There has been an error.</p>}
    </footer>
  );
};

export default connect(state => state.error)(Footer);
{/*<span id="error-description"></span>*/}