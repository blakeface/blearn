import React, { Component } from 'react'

export default class AuthMessage extends Component {
	render() {
		this.messages = {
			email: {
				__html: "🧐 Your email looks weird. Does it follow this format: <i>name@domain.tld</i>?"
			},
			passwordPrimary: {
				__html: "🤭 Password must be at least 8 characters long"
			},
			passwordSecondary: {
				__html: "🤔 Passwords don't match :("
			},
			errorUsernameExists: {
				__html: "For security reasons, I can't confirm that you've already signed up... but if I was you, I'd reset your password 😉",
			},
			loginSuccess: {
				__html: "👍 Success! Please check your email for a verification code."
			},
		}

		return (
			<span className="errorMessage" dangerouslySetInnerHTML={this.messages[this.props.type]}></span>
		)
	}
}