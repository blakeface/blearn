import React, { Component } from 'react';

import AuthPassword from './password'

export default class AuthInputs extends Component {
	render() {
		return (
			<div className="inputs-container">
				<div className={this.props.getClassName('email')}>
					<input className="input-field" type="email" id="email" name="email"
								onChange={this.props.handleChange}
								onBlur={this.props.handleBlur}
								value={this.props.email}
								/>
					<label className="input-label" htmlFor="email">
						<span className="label-content">Email</span>
					</label>
				</div>

				<AuthPassword role="Primary"
									value={this.props.passwordPrimary}
									handleChange={this.props.handleChange}
									handleBlur={this.props.handleBlur}
									getClassName={this.props.getClassName}
									/>

				{ this.props.mode == 'signup'
						? <AuthPassword role="Secondary"
												value={this.props.passwordSecondary}
												handleChange={this.props.handleChange}
												handleBlur={this.props.handleBlur}
												getClassName={this.props.getClassName}
												/>
						: null }
			</div>
		)
	}
}