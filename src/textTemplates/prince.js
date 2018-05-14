import React from 'react';

export const HeaderText = () => <p>You're just a minute away from booking your table at The Prince!</p>;

export const UsualInfoText = () => (
	<div>
		<p id="seating-areas-info">
			<strong>See information on the garden and pub seating areas above.</strong>
			<i className="fa fa-long-arrow-right" aria-hidden="true" />
		</p>
		<p>
			<strong>Walk Ins:</strong> If due to popular demand the date you would like to reserve is fully booked, come and
			grab one of our many walk in spaces. Alternatively, we do often receive cancellations on the day, please email us
			at <a href="mailto:contact@theprincelondon.com">contact@theprincelondon.com</a> and we will do our best to find
			you a table.
		</p>
		<p>
			<strong>Times:</strong> We have two sittings – 12pm until 5pm and 4pm until close.
		</p>
		<p>
			<strong>Kids:</strong> We welcome children with open arms, however please note that on Fridays and Saturdays we
			kindly ask all that all under 18’s leave the site by 6pm.
		</p>
		<p>
			<strong>Groups of 50+:</strong> We do accommodate groups of 50 or more.<br />
			Please email <a href="mailto:contact@theprincelondon.com">contact@theprincelondon.com</a>
		</p>
		<p>
			For private hires of the venue please visit our{' '}
			<strong>
				<a href="/private-hire" rel="noopener noreferrer" target="_blank">
					private hire page.
				</a>
			</strong>
		</p>
	</div>
);

export const ConfirmReservationText = () => (
	<p>
		*IMPORTANT INFORMATION. We will hold your reservation for 30 minutes, we kindly ask that all your party arrives
		within this time. We will do our best to seat late comers but cannot guarantee entry
	</p>
);

export const CardDetailsText = () => (
	<div id="card-details-text">
		<p id="booking-conditions">Booking Conditions</p>
		<p>Rest assured we are NOT charging this card!</p>
		<p>We are only taking card details to secure your reservation with us.</p>
		<p>
			If all of your party attend then no problemo and nothing will be charged to your card. If you are going to cancel
			then you need to give us notice (at least 72 hours before the date of your reservation).
		</p>
		<p>You will only be charged £5 per person if the following happens:</p>
		<ul>
			<li>
				<p>You cancel within the 72 hours of your booking</p>
			</li>
			<li>
				<p>You don’t show up at all</p>
			</li>
			<li>
				<p>Less than 50% of your party attends</p>
			</li>
		</ul>
		<p id="agree-to-terms">By proceeding with this reservation I agree to the booking terms above.</p>
	</div>
);

export const ReservationConfirmedText = () => (
	<div>
		<p>Please keep an eye out for your booking confirmation email and further communication about this reservation.</p>
		<p>Be sure to check your junk folder as we know it can end up in there sometimes!</p>
		<p>
			Please please let us know if you need to cancel your reservation, simply email us at{' '}
			<a href="mailto:contact@theprincelondon.com">contact@theprincelondon.com</a> or manage your booking using your
			reference number <a href="/reservations">here</a>
		</p>
		<p>
			Although this system is automated, we are humans and we’re here to help! You can contact us on the email address
			above anytime.{' '}
		</p>
		<p>We look forward to seeing you very soon!</p>
	</div>
);
