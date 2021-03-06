import React, { Component } from 'react'

// components
import AuthForm from './auth/form'
import AuthButtons from './auth/buttons'
import AuthVerify from './auth/verify'
import AuthMessage from './auth/message'

// aws config
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from '../aws-exports';
Amplify.configure(aws_exports);

// styles (will smartly load this in one day)
import globalStyle from '../stylesheets/globals.css'
import buttonStyles from '../stylesheets/button.css'
import formStyles from '../stylesheets/form.css'
import inputStyles from '../stylesheets/input.css'

export default class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			authMode: 'default', // ['default', 'signup', 'login']
			signedup: false,
			verified: false,
			loggedin: false,
			email: '',
			message: '',
		}

		// bind methods
		this.handleButtonClick = this.handleButtonClick.bind(this)
		this.handleChildState = this.handleChildState.bind(this)
	}

	handleButtonClick(e) {
		this.setState({
			authMode: e.target.id,
		})
	}

	handleChildState(obj) {
		Object.keys(obj).forEach(key => {
			console.log(this.state)
			switch (key) {
				case ('signedup'):
					this.setState({
						message: 'signupSuccess',
						authMode: 'default',
					})
				case ('verified'):
					this.setState({
						message: 'verifySuccess',
						authMode: 'login',
					})
				case ('loggedin'):
					this.setState({ message: '' })
				case ('email'):
				case ('message'):
					return this.setState(prevState => {
						return {
							[key]: obj[key]
						}
					})
			}
		})
	}

	async componentWillMount() {
		// is user already logged in?
		await Auth.currentAuthenticatedUser()
			.then(user => this.setState({ loggedin: true }))
			.catch(err => this.setState({ loggedin: false }))
	}

	render() {
		return (
			<section className={this.state.authMode}>
				<div>
					<h1>BLEARN</h1>
					<p>A multidimensional learning app? Sounds good to me.</p>
				</div>

				{ ! this.state.loggedin
						? <AuthButtons handleClick={this.handleButtonClick} />
						: null }

				{ this.state.message ? <AuthMessage type='form' message={this.state.message} /> : null }

				{ ! this.state.loggedin && (this.state.authMode == 'signup' || this.state.authMode == 'login')
						? <AuthForm mode={this.state.authMode} handleParentState={this.handleChildState} />
						: null }

				{ this.state.signedup && ! this.state.verified
						? <AuthVerify email={this.state.email} handleParentState={this.handleChildState} />
						: null }

			</section>
		);
	}
}
