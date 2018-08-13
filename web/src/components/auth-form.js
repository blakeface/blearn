import React, { Component } from 'react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from '../aws-exports';

Amplify.configure(aws_exports);

// components
import Password from './password'
// styles
import formStyles from '../stylesheets/form.css'
import buttonStyles from '../stylesheets/button.css'
import inputStyles from '../stylesheets/input.css'

export default class AuthForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			// passwords
			passwordPrimary: '',
			passwordSecondary: '',
			passwordPrimaryError: false,
			passwordSecondaryError: false,
			// email
			email: '',
			emailError: false,
		}

		this.handleFormSubmit = this.handleFormSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.validateInput = this.validateInput.bind(this)
	}

	async handleFormSubmit(e) {
		e.preventDefault();

		// signup
		// if (this.props.authMode == 'signup') {
		// 	await Auth.signUp(this.state.email, this.state.password)
		// 		.then(data => console.log(data))
		// 		.catch(err => console.error(err))
		// }
		// // login
		// else {
		// 	await Auth.signUp(this.state.email, this.state.password)
		// 		.then(data => console.log(data))
		// 		.catch(err => console.error(err))
		// }
	}

	handleInputChange(e) {
		const value = e.target.value
		const parentNode = e.target.parentNode

		// udpate email and password states
		this.setState({
			[e.target.id]: value
		})

		// toggle .input-filled class
		if (value.length) parentNode.classList.add('input-filled')
		else parentNode.classList.remove('input-filled')
	}

	validateInput(e) {
		const value = e.target.value
		const parentNode = e.target.parentNode
		const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		switch (e.target.id) {
			case ('email'):
				// length test
				this.setState({ emailError: value.trim().length > 0 })
				// regex tests
				this.setState({ emailError: emailReg.test(value) })
				break
			case ('passwordPrimary'):
				this.setState({ passwordRequired: value.trim().length > 0 })
				break
			case ('passwordSecondary'):
				this.setState({ passwordMatch: (value == this.state.passwordPrimary) })
		}
	}

	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>

				<div className="inputs-container">
					<div className={'input ' + (this.state.emailRequired || this.state.emailInvalid ? 'error' : '')}>
						<input className="input-field" type="email" id="email" name="email"
									onChange={this.handleInputChange}
									value={this.state.email}
									// onBlur={this.validateInput}
									/>
						<label className="input-label" htmlFor="email">
							<span className="label-content">Email</span>
						</label>
					</div>

					<Password role="Primary"
										handleChange={this.handleInputChange}
										value={this.state.passwordPrimary}
										// validatePassword={this.validateInput}
										hasError={(this.state.passwordRequired || this.state.passwordIncorrect)}
										/>

					{ this.props.authMode == 'signup'
						? <Password role="Secondary"
												handleChange={this.handleInputChange}
												value={this.state.passwordSecondary}
												// validatePassword={this.validateInput}
												hasError={(this.state.passwordRequired
														|| this.state.passwordIncorrec
														|| ! this.state.passwordMatch)}
												/>
						: null }
				</div>

				<button className="input-button" type="submit">CHA CHING!</button>
			</form>
		)
	}
}