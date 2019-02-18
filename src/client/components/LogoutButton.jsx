'use strict';

import React from 'react';

export default class LogoutButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='logout-button'>
				<button onClick={this.props.logout}>
					Sign out
				</button>
			</div>
		);
	}
}
