"use strict";

import React from "react";

export default class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.loginButton = React.createRef();
	}

	componentDidMount() {
		window.auth2.attachClickHandler(this.loginButton.current, {},
			function(googleUser) {
				const nameOfUser = googleUser.getBasicProfile().getName();
				window.alert(nameOfUser);
			}, function(error) {
				alert(JSON.stringify(error, undefined, 2));
			});
	}

	render() {
		return (
			<div>
				<h1>Log in</h1>
				<div ref={this.loginButton} className="customGPlusSignIn">
					<span className="icon"></span>
					<span className="buttonText">Google</span>
				</div>
			</div>
		);
	}
}