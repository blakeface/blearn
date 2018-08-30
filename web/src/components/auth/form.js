import React, { Component } from 'react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from '../../aws-exports';

Amplify.configure(aws_exports);

// components
import AuthMessage from './message'
import AuthInputs from './inputs'
import AuthVerify from './verify'

export default class AuthForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			// ERRORS:
			// ['email', 'passwordPrimary', 'passwordSecondary', 'verify', 'UsernameExistsException']
			errors: [],

			// PASSWORDS
			passwordPrimary: '',
			passwordSecondary: '',
			passwordPrimaryLength: 0,
			passwordSecondaryLength: 0,

			// EMAILS
			email: '',
			emailLength: 0,
		}

		// bind eventHandlers
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.validateInput = this.validateInput.bind(this)
		// bind methods
		this.handleError = this.handleError.bind(this)
		this.getClassName = this.getClassName.bind(this)
		this.hasErrors = this.hasErrors.bind(this)
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
				.then(data => {
					console.log('data from signUp', data)
					if (data.user) this.props.handleParentState({
						signedup: true,
						email: this.state.email,
					})
				})
				.catch(err => {
					this.handleError(err)
					// user already exists
					this.props.handleParentState({
						signedup: false,
						message: err.code,
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
				this.setState( prevState => prevState.errors.push(id) )
			}
		}
		else {
			const i = this.state.errors.indexOf(id)
			if (i > -1) {
				this.setState( prevState => prevState.errors.splice(i, 1) )
			}
		}
	}

	getClassName(type) {
		const length = this.state[type + 'Length']

		if (type == 'email' || type.indexOf('password') != -1 || type == 'verify') {
			return 'input'
				+ (this.state.errors.includes(type) ? ' error' : '')
				+ (length > 0 ? ' input-filled' : '' )

		}
		else if (type == 'button') {
			return 'input-button'
				+ (this.hasErrors() ? ' error' : '')
		}
	}

	hasErrors() {
		if ( this.state.emailLength < 4
			|| this.state.passwordPrimaryLength < 8
			|| this.state.passwordSecondaryLength < 8
		) return true;

		if ( ! this.state.errors.length) return false;

		const errors = ['email', 'passwordPrimary', 'passwordSecondary']
		return this.state.errors.every(err => {
			return errors.indexOf(err) !== -1
		})
	}

	componentDidUpdate(prevProps, prevState) {
		// reset error message
		if (prevProps != this.props) {
			this.setState({
				errors: [],
				loginSuccess: false,
				signupSuccess: false,
			})
		}
	}

	render() {

		return (
			<form onSubmit={this.handleFormSubmit}>

				<AuthInputs mode={this.props.mode}
										getClassName={this.getClassName}
										handleChange={this.handleInputChange}
										handleBlur={this.validateInput}
										email={this.state.email}
										passwordPrimary={this.state.passwordPrimary}
										passwordSecondary={this.state.passwordSecondary}
										/>

 				{ this.props.mode == 'signup'
 						? this.state.errors.map( (err, i) => <AuthMessage type="error" message={err} key={i} /> )
 						: null }

				<button className={this.getClassName('button')} type="submit">
					{ this.hasErrors() ? 'Not yet...' : "Let's Do This Thing!" }
				</button>

			</form>
		)
	}
}