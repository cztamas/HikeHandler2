'use strict';

import React from 'react';
import { login } from '../services/api';

export default class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.loginButton = React.createRef();
	}

	componentDidMount() {
		window.auth2.attachClickHandler(this.loginButton.current, {},
			async function(googleUser) {
				const idToken = googleUser.getAuthResponse().id_token;
				await login(idToken);

				window.location.reload();
			}, function(error) {
				alert(JSON.stringify(error, undefined, 2));
			});
	}

	render() {
		return (
			<div>
				<h1>Log in</h1>
				<div ref={this.loginButton} className='google-sso'>
					<div className='google-sso-icon'></div>
					<div className='google-sso-button-text'>Sign in with Google</div>
				</div>
			</div>
		);
	}
}