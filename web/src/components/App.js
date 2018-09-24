import React, { Component } from 'react'

// components
import AuthContainer from './auth/auth-container'
import AppContainer from './app/app-container'

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
	constructor(props) {
		super(props)
		this.state = {
			needsAuth: false,
		}
	}

	async componentWillMount() {
		// is user already logged in?
		await Auth.currentAuthenticatedUser()
			.then(user => this.setState({ needsAuth: false }))
			.catch(err => this.setState({ needsAuth: true }))
	}

	updateAuthState(val) {
		this.setState({ needsAuth: val })
	}

	render() {
		return (
			<section>
				{ this.state.needsAuth
					? <AuthContainer updateAuthState={this.updateAuthState} />
					: <AppContainer updateAuthState={this.updateAuthState} />
				}
			</section>
		);
	}
}
