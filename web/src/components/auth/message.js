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
		}

		return (
			<span className="errorMessage" dangerouslySetInnerHTML={this.messages[this.props.type]}></span>
		)
	}
}