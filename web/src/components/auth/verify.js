import React, { Component } from 'react'

export default class AuthVerify extends Component {
	constructor(props) {
		super(props)

		// bind eventHandlers
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
	}

	handleFormSubmit(e) {
		e.preventDefault()
	}

	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>
				<div className={this.props.getClassName('verify')}>
						<input className="input-field" type="number" id="verify" name="verify"
									onChange={this.props.handleChange}
									value={this.props.code}
									/>
						<label className="input-label" htmlFor="verify">
							<span className="label-content">Verification Code</span>
						</label>
					</div>
			</form>
		)
	}
}