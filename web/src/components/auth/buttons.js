import React, { Component } from 'react'
import buttonStyles from '../../stylesheets/button.css'

export default class AuthButtons extends Component {

	render() {
		return (
			<div className="button-container">
				<button className="input-button" id="signup" onClick={this.props.handleClick}>
					SIGN UP
				</button>
				<button className="input-button" id="login" onClick={this.props.handleClick}>
					LOGIN
				</button>
			</div>
		)
	}
}