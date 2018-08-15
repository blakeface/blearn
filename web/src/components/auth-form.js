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
			// PASSWORDS
			passwordPrimary: '',
			passwordSecondary: '',
			// validation
			passwordInvalid: false,
			passwordMismatch: false,
			// length checks
			passwordPrimaryLength: 0,
			passwordSecondaryLength: 0,

			// EMAILS
			email: '',
			emailError: false,
			emailLength: 0,
		}

		this.error = {
			email: {
				__html: "Your email looks weird. Does it follow this format: <i>name@domain.tld</i>?"
			},
			passwordPrimary: "Password must be at least 8 characters long",
			passwordSecondary: "Passwords don't match :("
		}

		this.handleFormSubmit = this.handleFormSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.validateInput = this.validateInput.bind(this)
	}

	async handleFormSubmit(e) {
		e.preventDefault();

		// signup
		if (this.props.authMode == 'signup') {
			await Auth.signUp(this.state.email, this.state.passwordPrimary)
				.then(data => console.log(data))
				.catch(err => console.error(err))
		}
		// login
		else {
			await Auth.signIn(this.state.email, this.state.passwordPrimary)
				.then(data => console.log(data))
				.catch(err => console.error(err))
		}
	}

	handleInputChange(e) {
		const value = e.target.value
		const parentNode = e.target.parentNode

		// update email and password states
		this.setState({
			[e.target.id]: value,
			[`${e.target.id}Length`]: value.length
		})


	}

	validateInput(e) {
		const value = e.target.value
		const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		switch (e.target.id) {
			case ('email'):
				// regex test
				this.setState({ emailError: ! emailReg.test(value) })
				break
			case ('passwordPrimary'):
				// length test
				this.setState({ passwordInvalid: value.trim().length < 7 })
				break
			case ('passwordSecondary'):
				// equality test
				this.setState({ passwordMismatch: value !== this.state.passwordPrimary })
				break
		}

		// console.log(`
		// 	passwordPrimary: ${this.state.passwordPrimary}
		// 	passwordSecondary: ${this.state.passwordSecondary}
		// 	passwordInvalid: ${this.state.passwordInvalid}
		// 	passwordMismatch: ${this.state.passwordMismatch}
		// `)
	}

	render() {
		const hasError = ( this.state.emailError
			|| this.state.passwordInvalid
			|| this.state.passwordMismatch
		)

		return (
			<form onSubmit={this.handleFormSubmit}>

				<div className="inputs-container">
					<div className={'input' + (this.state.emailError ? ' error' : '') + (this.state.emailLength > 0 ? ' input-filled' : '' )}>
						<input className="input-field" type="email" id="email" name="email"
									onChange={this.handleInputChange}
									value={this.state.email}
									onBlur={this.validateInput}
									/>
						<label className="input-label" htmlFor="email">
							<span className="label-content">Email</span>
						</label>
					</div>

					<Password role="Primary"
										handleChange={this.handleInputChange}
										value={this.state.password}
										validatePassword={this.validateInput}
										hasError={this.state.passwordInvalid}
										isFilled={this.state.passwordPrimaryLength > 0}
										/>

					{ this.props.authMode == 'signup'
						? <Password role="Secondary"
												handleChange={this.handleInputChange}
												value={this.state.passwordSecondary}
												validatePassword={this.validateInput}
												hasError={this.state.passwordMismatch}
												isFilled={this.state.passwordSecondaryLength > 0}
												/>
						: null }
				</div>

				{ this.state.emailError
						? <span className="errorMessage" dangerouslySetInnerHTML={this.error.email}></span>
						: null }

				{ this.state.passwordInvalid
					? <span className="errorMessage">{this.error.passwordPrimary}</span>
					: null }

				{ this.state.passwordMismatch
					? <span className="errorMessage">{this.error.passwordSecondary}</span>
					: null }

				<button className={'input-button' + (hasError ? ' error' : '')}
								type="submit">
					{ hasError ? 'No dice' : 'Cha Ching!' }
				</button>
			</form>
		)
	}
}