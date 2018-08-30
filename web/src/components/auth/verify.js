import React, { Component } from 'react'
import Amplify, { Auth } from 'aws-amplify';

export default class AuthVerify extends Component {
	constructor(props) {
		super(props)

		this.state = {
			verifyCode: '',
			verifyCodeLength: 0,
		}

		// bind eventHandlers
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleFormSubmit(e) {
		e.preventDefault()

		Auth.confirmSignUp(this.props.email, this.state.verifyCode, {
		  forceAliasCreation: true
		})
			.then(data => console.log(data))
		  .catch(err => console.log(err));
	}

	handleChange(e) {
		const value = e.target.value
		const id = e.target.id

		this.setState({
			[id]: value,
			[`${id}Length`]: value.length
		})
	}

	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>
				<div className="input">
					<input className="input-field" type="text" id="verifyCode" name="verifyCode"
								onChange={this.handleChange}
								value={this.state.verifyCode}
								/>
					<label className="input-label" htmlFor="verifyCode">
						<span className="label-content">Verification Code</span>
					</label>
				</div>

				<button className="input-button" type="submit">Submit</button>
			</form>
		)
	}
}