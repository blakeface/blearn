import React from 'react'
import PropTypes from 'prop-types'
// style
import buttonStyles from '../../stylesheets/button.css'

const AuthButtons = ({ handleClick }) => (
	<div className="button-container">
		<button className="input-button" id="signup" onClick={handleClick(() => 'signup')}>
			SIGN UP
		</button>
		<button className="input-button" id="login" onClick={handleClick(() => 'login')}>
			LOGIN
		</button>
	</div>
)

AuthButtons.propTypes = {
	handleClick: PropTypes.func.isRequired
}

export default AuthButtons

