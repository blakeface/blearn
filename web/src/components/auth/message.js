import React, { Component } from 'react'
import PropTypes from 'prop-types'

const errorMessages = {
	email: {
		__html: "🧐 Your email looks weird. Does it follow this format: <i>name@domain.tld</i>?"
	},
	passwordPrimary: {
		__html: "🤭 Password must be at least 8 characters long."
	},
	passwordSecondary: {
		__html: "🤔 Passwords don't match."
	},
}

const formMessages = {
	loginSuccess: "Success! Please check your email for a verification code.",
	UsernameExistsException: "Something isn't quiet right. If I was you, I'd try resetting my password..."
}

const AuthMessage = ({ type, message }) => {
	switch (type) {
		case ('error'):
			return (
				<span className="errorMessage" dangerouslySetInnerHTML={errorMessages[message]}></span>
			)
		case ('form'):
			return (
				<span className="errorMessages">{formMessages[message]}</span>
			)
		default:
			return null
	}
}

AuthMessage.propTypes = {
	type: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
}

export default  AuthMessage