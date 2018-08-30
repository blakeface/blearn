import React, { Component } from 'react';
import PropTypes from 'prop-types'
import AuthPassword from './password'

const AuthInputs = ({ getClassName, handleChange, handleBlur, email, passwordPrimary, passwordSecondary, mode }) => (
	<div className="inputs-container">
		<div className={getClassName('email')}>
			<input className="input-field" type="email" id="email" name="email"
						onChange={handleChange}
						onBlur={handleBlur}
						value={email}
						/>
			<label className="input-label" htmlFor="email">
				<span className="label-content">Email</span>
			</label>
		</div>

		<AuthPassword role="Primary"
							value={passwordPrimary}
							handleChange={handleChange}
							handleBlur={handleBlur}
							getClassName={getClassName}
							/>

		{ mode == 'signup'
				? <AuthPassword role="Secondary"
										value={passwordSecondary}
										handleChange={handleChange}
										handleBlur={handleBlur}
										getClassName={getClassName}
										/>
				: null }
	</div>
)

AuthInputs.propTypes = {
	getClassName: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleBlur: PropTypes.func.isRequired,
	email: PropTypes.string.isRequired,
	passwordPrimary: PropTypes.string.isRequired,
	passwordSecondary: PropTypes.string.isRequired,
	mode: PropTypes.string.isRequired,
}

export default AuthInputs