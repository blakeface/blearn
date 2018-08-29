import React, { Component } from 'react'

export default class AuthPassword extends Component {

	render() {
		const id = "password" + this.props.role
		return (
			<div className={this.props.getClassName(id)}>
				<input className="input-field"
							type="password"
							id={id}
							name={id}
							onChange={this.props.handleChange}
							value={this.props.value}
							onBlur={this.props.handleBlur}
							/>
				<label className="input-label" htmlFor={id}>
					<span className="label-content">
						{this.props.role == 'Secondary' ? 'Confirm' : ''} Password
					</span>
				</label>
			</div>
		)
	}
}