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
			passwordInvalid: false,
			passwordMismatch: false,
			// email
			email: '',
			emailError: false,
		}

		this.error = {
			email: {
				__html: "Hmmm, something doesn't look right. Does your email follow this format: <i>name@domain.tld</i>?"
			},
			passwordPrimary: "wrong!",
			passwordSecondary: "doesn't match!"
		}

		this.handleFormSubmit = this.handleFormSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.validateInput = this.validateInput.bind(this)
	}

	async handleFormSubmit(e) {
		e.preventDefault();

		console.log(this.state.email, this.state.passwordPrimary, this.props.authMode)

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
		const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const passwordRegDigit = /\d+/;
		const passwordRegLower = /[a-z]/;
		const passwordRegUpper = /[A-Z]/;
		const passwordRegSpecial = /[A-Z]/;

		switch (e.target.id) {
			case ('email'):
				// length test
				this.setState({ emailError: value.trim().length === 0 })
				// regex tests
				this.setState({ emailError: ! emailReg.test(value) })
				break
			case ('passwordPrimary'):
				// length test
				// this.setState({ passwordInvalid: value.trim().length === 0 })
				// regex test
				this.setState({ passwordInvalid: ! passwordRegDigit.test(value) })
				break
			case ('passwordSecondary'):
				// equality test
				this.setState({ passwordMismatch: (value !== this.state.passwordPrimary) })
				break
		}

		console.log(`
			passwordPrimary: ${this.state.passwordPrimary}
			passwordSecondary: ${this.state.passwordSecondary}
			passwordInvalid: ${this.state.passwordInvalid}
			passwordMismatch: ${this.state.passwordMismatch}
		`)
	}

	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>

				<div className="inputs-container">
					<div className="input">
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
										/>

					{ this.props.authMode == 'signup'
						? <Password role="Secondary"
												handleChange={this.handleInputChange}
												value={this.state.passwordSecondary}
												validatePassword={this.validateInput}
												/>
						: null }
				</div>

				{ this.state.emailError
						? <span className="error" dangerouslySetInnerHTML={this.error.email}></span>
						: null }

				{ this.state.passwordInvalid
					? <span className="error">{this.error.passwordPrimary}</span>
					: null }

				{ this.state.passwordMismatch
					? <span className="error">{this.error.passwordSecondary}</span>
					: null }

				<button className={"input-button " + (this.state.hasError ? 'error' : '')}
								type="submit"
								>
					CHA CHING!
				</button>
			</form>
		)
	}
}