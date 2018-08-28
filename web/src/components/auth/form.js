import React, { Component } from 'react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from '../../aws-exports';

Amplify.configure(aws_exports);

// components
import AuthPassword from './password'
import AuthMessage from './message'
// styles
import formStyles from '../../stylesheets/form.css'
import buttonStyles from '../../stylesheets/button.css'
import inputStyles from '../../stylesheets/input.css'

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
			errors: [],

			// CONFIRMATION:
			loginSuccess: false,
		}

		// bind eventHandlers
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.validateInput = this.validateInput.bind(this)
		this.handleError = this.handleError.bind(this)
		this.getClassName = this.getClassName.bind(this)
	}

	handleError(err){
		console.error('Error!:', err)
	}

	async handleFormSubmit(e) {
		e.preventDefault();

		// SIGNUP
		if (this.props.mode == 'signup') {
			// step #1
			await Auth.signUp({
				username: this.state.email,
				password: this.state.passwordPrimary,
				attributes: {
					email: this.state.email,
				},
			})
				.then( async data => {
					console.log('data from signUp', data)
					this.props.updateParentState({ signedup: true })
				})
				.catch(err => {
					this.handleError(err)
					this.props.updateParentState({
						// user already exists
						usernameExists: err.code == 'UsernameExistsException',
						signedup: false,
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
			if ( ! this.state.errors.includes(id)) {
				this.setState((prevState) => {
					return prevState.errors.push(id)
				})
			}
		}
		else {
			const i = this.state.errors.indexOf(id)
			if (i > -1) {
				this.setState((prevState) => {
					return prevState.errors.splice(i, 1)
				})
			}
		}
	}

	getClassName(type) {
		const length = this.state[type + 'Length']

		if (type == 'email' || type.indexOf('password') != -1) {
			return 'input'
				+ (this.state.errors.includes(type) ? ' error' : '')
				+ (length > 0 ? ' input-filled' : '' )

		}
		else if (type == 'button') {
			return 'input-button'
				+ (['email', 'passwordPrimary', 'passwordSecondary'].includes(this.state.error)
					? ' error'
					: '')
		}
	}

	componentDidUpdate(prevProps, prevState) {
		// reset error message
		// if (prevProps != this.props) {
		// 	this.setState({ errorUsernameExists: false })
		// }
	}

	render() {

		return (
			<form onSubmit={this.handleFormSubmit}>

				<div className="inputs-container">
					<div className={this.getClassName('email')}>
						<input className="input-field" type="email" id="email" name="email"
									onChange={this.handleInputChange}
									value={this.state.email}
									onBlur={this.validateInput}
									/>
						<label className="input-label" htmlFor="email">
							<span className="label-content">Email</span>
						</label>
					</div>

					<AuthPassword role="Primary"
										handleChange={this.handleInputChange}
										value={this.state.password}
										validatePassword={this.validateInput}
										getClassName={this.getClassName}
										/>

					{ this.props.mode == 'signup'
							? <AuthPassword role="Secondary"
													handleChange={this.handleInputChange}
													value={this.state.passwordSecondary}
													validatePassword={this.validateInput}
													getClassName={this.getClassName}
													/>
							: null }
				</div>

				{ this.props.mode == 'signup'
 						? this.state.errors.map( (err, i) => <AuthMessage type={err} key={i} /> )
 						: null }

				<button className={this.getClassName('button')} type="submit">
					{ ['email', 'passwordPrimary', 'passwordSecondary'].includes(this.state.error)
							? 'No dice'
							: 'Cha Ching!' }
				</button>

			</form>
		)
	}
}