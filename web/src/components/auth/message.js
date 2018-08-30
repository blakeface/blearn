import React, { Component } from 'react'
import PropTypes from 'prop-types'

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

const AuthMessage = ({ type }) => {
	if ( ! Object.keys(messages).includes(type) ) return null;
	else return (
		<span className="errorMessage" dangerouslySetInnerHTML={messages[type]}></span>
	)
}

AuthMessage.propTypes = {
	type: PropTypes.string.isRequired,
}

export default  AuthMessage