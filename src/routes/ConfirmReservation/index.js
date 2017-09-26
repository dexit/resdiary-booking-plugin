import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setPage, setTerms} from '../../actions';
import ProposedReservation from '../../components/ProposedReservation';
import CustomEvent from 'custom-event';
import {ConfirmReservationText} from 'textTemplates';

class ConfirmReservation extends Component {

  componentWillMount() {
    this.props.setPage(2);
  }

  handleChange = e => {
    this.props.setTerms(e.target.checked);
  };

  dispatchTerms = () => {
    const event = new CustomEvent('resdiary:terms', {
      detail: {
        terms: this.props.terms
      }
    });
    document.getElementById('resdiary-reservations').dispatchEvent(event);
  };

  render() {
    const {timeSlot, people, termsAgreed} = this.props;

    return (
      <section id="confirm-reservation">
        <div>
          <ProposedReservation timeSlot={timeSlot} people={people}/>
          <div className="text-container">
            <ConfirmReservationText/>
            <p>*Please read our booking Terms and Conditions
              <span id="terms-modal" onClick={this.dispatchTerms}> here</span>
            </p>
            <p>
              <label>
                <input type="checkbox" name="terms" value="agree" onChange={this.handleChange} checked={termsAgreed}/> I
                accept the Terms and Conditions
              </label>
            </p>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    people: state.form.reservationDetails.values.people,
    timeSlot: state.timeSlot,
    termsAgreed: state.termsAgreed,
    terms: state.restaurant.TermsAndConditions
  };
};

export default connect(mapStateToProps, {setTerms, setPage})(ConfirmReservation);
