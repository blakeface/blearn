import React, { Component } from 'react'

export default class AuthMessage extends Component {

	render() {
		const messages = {
			email: {
				__html: "🧐 Your email looks weird. Does it follow this format: <i>name@domain.tld</i>?"
			},
			passwordPrimary: {
				__html: "🤭 Password must be at least 8 characters long"
			},
			passwordSecondary: {
				__html: "🤔 Passwords don't match :("
			},
			verify: {
				__html: "😖 Verification code is incorrect. Please double-check your input."
			}
		}

		// ensure we have the correct message in message object
		console.log(Object.keys(messages))
		console.log(this.props.type)
		if ( ! Object.keys(messages).includes(this.props.type) ) return null;
		else return (
			<span className="errorMessage" dangerouslySetInnerHTML={messages[this.props.type]}></span>
		)
	}
}