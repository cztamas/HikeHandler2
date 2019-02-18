'use strict';

import React from 'react';

export default class MainComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='main-component'>
				<h1>App content</h1>
				<h2>You are {this.props.user.email}</h2>
			</div>
		);
	}
}
