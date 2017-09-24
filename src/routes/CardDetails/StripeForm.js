import React, {Component} from 'react';
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement,
  injectStripe,
  PostalCodeElement
} from 'react-stripe-elements';

class StripeForm extends Component {

  static style = {
    base: {
      iconColor: '#666EE8',
      color: '#31325F',
      lineHeight: '40px',
      fontWeight: 300,
      fontFamily: `'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif`,
      fontSize: '15px',
      '::placeholder': {
        color: '#868686',
      }
    }
  };

  handleClick = () => this.props.getStripeToken(this.props.stripe);
  handleChange = e => {
    setTimeout(() => {
      if (this.stripeCardNumber._complete && this.stripeCardExpiry._complete && this.stripeCvc._complete && this.stripeCardPostcode._complete) {
        this.props.paymentDetailsVaild(true);
      } else {
        if (this.props.paymentValid) {
          this.props.paymentDetailsVaild(false);
        }
      }
    });
  };


  render() {
    return (
      <section id="card-details">
        <div>
          <form id="stripe-form" onClick={this.handleClick}>
            <CardNumberElement
              elementRef={ref => this.stripeCardNumber = ref}
              style={StripeForm.style}
              onChange={this.handleChange}
            />
            <CardExpiryElement
              elementRef={ref => this.stripeCardExpiry = ref}
              style={StripeForm.style}
              onChange={this.handleChange}
            />
            <CardCVCElement
              elementRef={ref => this.stripeCvc = ref}
              style={StripeForm.style}
              onChange={this.handleChange}
            />
            <PostalCodeElement
              elementRef={ref => this.stripeCardPostcode = ref}
              style={StripeForm.style}
              onChange={this.handleChange}
            />
          </form>
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>
    );
  }
}


export default injectStripe(StripeForm);
