import React, {Component} from 'react';
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement,
  injectStripe,
  PostalCodeElement
} from 'react-stripe-elements';
import {CardDetailsText} from 'textTemplates';

class StripeForm extends Component {

  static style = {
    base: {
      iconColor: `#666EE8`,
      '::placeholder': {
        color: `#757575`,
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
              placeholder="Card Number"
            />
            <CardExpiryElement
              elementRef={ref => this.stripeCardExpiry = ref}
              style={StripeForm.style}
              onChange={this.handleChange}
              placeholder="Expiration Date"
            />
            <CardCVCElement
              elementRef={ref => this.stripeCvc = ref}
              style={StripeForm.style}
              onChange={this.handleChange}
              placeholder="Security Code"
            />
            <PostalCodeElement
              elementRef={ref => this.stripeCardPostcode = ref}
              style={StripeForm.style}
              onChange={this.handleChange}
              placeholder="Postal Code"
            />
          </form>
        </div>
        <div>
          <CardDetailsText/>
        </div>
      </section>
    );
  }
}


export default injectStripe(StripeForm);
