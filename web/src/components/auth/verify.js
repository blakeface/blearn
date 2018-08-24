import React, { Component } from 'react'

export default class AuthVerify extends Component {
	constructor(props) {
		super(props)

		// bind eventHandlers
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
	}

	handleFormSubmit(e) {
		e.preventDefault()
	}

	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>
				<div className={'input' + (this.state.verificationCodeLength > 0 ? ' input-filled' : '' )}>
						<input className="input-field" type="text" id="verificationCode" name="verificationCode"
									onChange={this.props.handleChange}
									value={this.state.verificationCode}
									/>
						<label className="input-label" htmlFor="verificationCode">
							<span className="label-content">Verification Code</span>
						</label>
					</div>
			</form>
		)
	}
}