import React, { Component } from 'react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from '../aws-exports';

Amplify.configure(aws_exports);

// components
import Password from './password'
import AuthMessage from './auth-message'
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
			passwordPrimaryLength: 0,
			passwordSecondaryLength: 0,

			// EMAILS
			email: '',
			emailLength: 0,

			// ERRORS:
			error: '',

			// CONFIRMATION:
			loginSuccess: false,
		}

		// bind eventHandlers
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.validateInput = this.validateInput.bind(this)
		this.handleError = this.handleError.bind(this)
	}

	handleError(err){
		console.error('Error!:', err)
	}

	async handleFormSubmit(e) {
		e.preventDefault();

		// SIGNUP
		if (this.props.authMode == 'signup') {
			// step #1
			await Auth.signUp({
				username: this.state.email,
				password: this.state.passwordPrimary,
				attributes: {
					email: this.state.email,
				},
			})
				.then( async data => {
					console.log('data from signUP', data)
					this.setState({ loginSuccess: true })
				})
				.catch(err => {
					this.handleError(err)
					this.setState({
						// user already exists
						errorUsernameExists: err.code == 'UsernameExistsException',
						loginSuccess: false,
					})
				})

			// step #2
			if (this.state.loginSuccess) {

				// await Auth.confirmSignUp(this.state.email, {
				// 	forceAliasCreation: true
				// })
				// 	.then(data => console.log('data in confirmSignUp', data))
				// 	.catch(err => this.handleErr(err));
			}
		}

		// LOGIN
		else {
			await Auth.signIn(this.state.email, this.state.passwordPrimary)
				.then(data => console.log('data from signIn:', data))
				.catch(err => this.handleError(err))
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
		const id = e.target.id
		const value = e.target.value
		const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (
			(id == 'email' && ! emailReg.test(value)) // email regex test
			|| (id == 'passwordPrimary' && value.trim().length < 7) // password length test
			|| (id == 'passwordSecondary' && value != this.state.passwordPrimary) // password equality test
		) {
			// don't override existing error
			if ( ! this.state.error.length)
				this.setState({ error: id })
		}
		else {
			this.setState({ error: '' })
		}
	}

	componentDidUpdate(prevProps, prevState) {
		// reset error message
		if (prevProps != this.props) {
			this.setState({ errorUsernameExists: false })
		}
	}

	render() {
		const hasError = ( ['email', 'passwordPrimary', 'passwordSecondary'].includes(this.state.error) )

		return (
			<form onSubmit={this.handleFormSubmit}>

				<div className="inputs-container">
					<div className={'input' + (this.state.error == 'email' ? ' error' : '') + (this.state.emailLength > 0 ? ' input-filled' : '' )}>
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
										hasError={this.state.error == 'passwordPrimary'}
										isFilled={this.state.passwordPrimaryLength > 0}
										/>

					{ this.props.authMode == 'signup'
						? <Password role="Secondary"
												handleChange={this.handleInputChange}
												value={this.state.passwordSecondary}
												validatePassword={this.validateInput}
												hasError={this.state.error == 'passwordSecondary'}
												isFilled={this.state.passwordSecondaryLength > 0}
												/>
						: null }
				</div>

				{ this.state.error.length
						? <AuthMessage type={this.state.error} />
						: null }

				<button className={'input-button' + (hasError ? ' error' : '')}
								type="submit">
					{ hasError ? 'No dice' : 'Cha Ching!' }
				</button>

			</form>
		)
	}
}