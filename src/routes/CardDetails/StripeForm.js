import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class StripeForm extends Component {

  handleClick = () => this.props.getStripeToken(this.props.stripe);
  handleChange = e => this.props.paymentDetailsVaild(e.complete);

  render() {
    return (
      <section id="card-details">
        <div>
          <form id="stripe-form" onClick={this.handleClick}>
            <CardElement onChange={this.handleChange}/>
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
};


export default injectStripe(StripeForm);
