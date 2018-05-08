import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { AppContainer } from 'react-hot-loader';
import ResDiaryBookingPlugin from './ResDiaryBookingPlugin';
import './assets/styles/_p-form.scss';

const container = document.getElementById('resdiary-reservations');

render(
	<AppContainer>
		<Provider store={store}>
			<ResDiaryBookingPlugin {...container.dataset} />
		</Provider>
	</AppContainer>,
	container
);

if (module.hot) {
	module.hot.accept('./ResDiaryBookingPlugin', () => {
		render(
			<AppContainer>
				<Provider store={store}>
					<ResDiaryBookingPlugin {...container.dataset} />
				</Provider>
			</AppContainer>,
			container
		);
	});
}
