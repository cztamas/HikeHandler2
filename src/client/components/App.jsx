'use strict';

import React from 'react';
import LoginPage from './LoginPage.jsx';
import MainComponent from './MainComponent.jsx';

const { googleClientId } = require('../config');

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedInUser: null,
			loading: true
		};
	}

	render() {
		return (
			<div className='app'>
				{
					this.state.loading ?
						<div>Loading...</div> :
						this.loggedInUser ? <MainComponent /> : <LoginPage />
				}
			</div>
		);
	}

	componentDidMount() {
		window.gapi.load('auth2', () => {
			// Retrieve the singleton for the GoogleAuth library and set up the client.
			window.auth2 = gapi.auth2.init({
				client_id: googleClientId,
				cookiepolicy: 'single_host_origin',
				// Request scopes in addition to 'profile' and 'email'
				//scope: 'additional_scope'
			});

			this.setState({
				loading: false
			});
		});
	}
}
