import React from 'react';

const Footer = props => {
  return (
    <footer>
      <button id="prev-button" type="button">Previous</button>
      <button id="next-button" type="button">Next</button>
      <button id="confirm-button" type="submit">Confirm</button>
      <p id="error-message">Oops! There has been an error.<span id="error-description"></span></p>
    </footer>
  );
};

export default Footer;
