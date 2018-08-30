import React, { Component } from 'react'
import PropTypes from 'prop-types'

const AuthPassword = ({ getClassName, handleBlur, handleChange, value, role }) => {
	const id = "password" + role
	return (
		<div className={getClassName(id)}>
			<input className="input-field"
						type="password"
						id={id}
						name={id}
						onChange={handleChange}
						value={value}
						onBlur={handleBlur}
						/>
			<label className="input-label" htmlFor={id}>
				<span className="label-content">
					{role == 'Secondary' ? 'Confirm' : ''} Password
				</span>
			</label>
		</div>
	)
}

AuthPassword.propTypes = {
	getClassName: PropTypes.func.isRequired,
	handleBlur: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	role: PropTypes.string.isRequired,
}

export default AuthPassword