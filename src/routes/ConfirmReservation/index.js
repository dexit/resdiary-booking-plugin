import React from 'react';
import {connect} from 'react-redux';
import {setTerms} from '../../actions';
import ProposedReservation from '../../components/ProposedReservation';

const ConfirmReservation = ({timeSlot, people, setTerms, termsAgreed}) => {

  const handleChange = e => {
    setTerms(e.target.checked);
  };

  return (
    <section id="confirm-reservation">
      <div>
        <ProposedReservation timeSlot={timeSlot} people={people}/>
        <div className="text-container">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </p>
          <p>
            <input type="checkbox" name="terms" value="agree" onChange={handleChange} checked={termsAgreed}/>
            <label htmlFor="terms">I accept the terms and conditions</label>
          </p>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    people: state.form.reservationDetails.values.people,
    timeSlot: state.timeSlot,
    termsAgreed: state.termsAgreed
  };
};

export default connect(mapStateToProps, {setTerms})(ConfirmReservation);