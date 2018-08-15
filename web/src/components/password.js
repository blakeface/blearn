import React, { Component } from 'react'

export default class Password extends Component {

	render() {
		return (
			<div className="input">
				<input className="input-field"
							type="password"
							id={"password" + this.props.role}
							name={"password" + this.props.role}
							onChange={this.props.handleChange}
							value={this.props.value}
							onBlur={this.props.validatePassword}
							/>
				<label className="input-label" htmlFor={"password" + this.props.role}>
					<span className="label-content">
						{this.props.role == 'Secondary' ? 'Confirm' : ''} Password
					</span>
				</label>
			</div>
		)
	}
}