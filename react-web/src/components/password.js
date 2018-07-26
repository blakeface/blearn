import React, { Component } from 'react'

export default class Password extends Component {

	render() {
		return (
			<div className="input">
				<input className="input-field"
							type="password"
							id={"password-" + this.props.role}
							name="password"
							/>
				<label className="input-label" htmlFor="email">
					<span className="label-content">
						{this.props.role == 'secondary' ? 'Confirm' : ''} Password
					</span>
				</label>
			</div>
		)
	}
}