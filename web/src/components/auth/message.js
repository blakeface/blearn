import React, { Component } from 'react'
import PropTypes from 'prop-types'

const errorMessages = {
	email: {
		__html: "😫 Your email looks weird. Does it follow this format: <i>name@domain.tld</i>?"
	},
	passwordPrimary: {
		__html: "😫 Password must be at least 8 characters long."
	},
	passwordSecondary: {
		__html: "😫 Passwords don't match."
	},
}

const formMessages = {
	signupSuccess: "Thanks! Please check your email for a verification code.",
	verifySuccess: "Success! Verified and Shmerified. Please login.",
	UsernameExistsException: "Something isn't quiet right. If I was you, I'd try resetting my password... hint, hint",
	CodeMismatchException: '😫 Invalid verification code. Try again.',
}

const AuthMessage = ({ type, message }) => {
	switch (type) {
		case ('error'):
			return (
				<span className="errorMessage" dangerouslySetInnerHTML={errorMessages[message]}></span>
			)
		case ('form'):
			return (
				<span className="errorMessage">{formMessages[message]}</span>
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