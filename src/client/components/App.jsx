'use strict';

import React from 'react';
import LoginPage from './LoginPage.jsx';
import LogoutButton from './LogoutButton.jsx';
import MainComponent from './MainComponent.jsx';
import { getJwtData, deleteCookie } from '../services/jwt';

const { googleClientId } = require('../config');

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedInUser: null,
			loading: true
		};

		this.logout = this.logout.bind(this);
	}

	logout() {
		this.setState({
			loggedInUser: null
		});
		deleteCookie();
	}

	render() {
		const loggedInContent = (
			<div>
				<LogoutButton logout={this.logout} />
				<MainComponent user={this.state.loggedInUser} />
			</div>
		);

		return (
			<div className='app'>
				{
					this.state.loading ?
						<div>Loading...</div> :
						this.state.loggedInUser ? loggedInContent : <LoginPage />
				}
			</div>
		);
	}

	componentDidMount() {
		window.gapi.load('auth2', () => {
			window.auth2 = gapi.auth2.init({
				client_id: googleClientId,
				cookiepolicy: 'single_host_origin',
				// Request scopes in addition to 'profile' and 'email'
				//scope: 'additional_scope'
			});

			const jwtData = getJwtData();
			if (jwtData) {
				this.setState({
					loggedInUser: {
						email: jwtData.email,
						id: jwtData.id
					}
				});
			}

			this.setState({
				loading: false
			});
		});
	}
}
