import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setPage, setTerms} from '../../actions';
import ProposedReservation from '../../components/ProposedReservation';
import CustomEvent from 'custom-event';

class ConfirmReservation extends Component {

  constructor(props) {
    super(props);
    this.termsModal;
  }


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
    this.termsModal.dispatchEvent(event);
  };

  render() {
    const {timeSlot, people, termsAgreed} = this.props;

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
            <p>*Please read our booking Terms and Conditions <span id="terms-modal" ref={ref => this.termsModal = ref}
                                                                   onClick={this.dispatchTerms}>here</span>
            </p>
            <p>
              <input type="checkbox" name="terms" value="agree" onChange={this.handleChange} checked={termsAgreed}/>
              <label htmlFor="terms">I accept the Terms and Conditions</label>
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