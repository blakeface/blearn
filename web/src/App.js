import React, { Component } from 'react'

// components
import AuthForm from './components/auth/form'
import AuthButtons from './components/auth/buttons'
import AuthVerify from './components/auth/verify'
// styles
import globalStyle from './stylesheets/globals.css'

export default class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			authMode: 'default', // ['default', 'signup', 'login']
			loggedin: false,
			signedup: false,
			messages: [],
		}

		// bind methods
		this.handleButtonClick = this.handleButtonClick.bind(this)
		this.handleChildStateChange = this.handleChildStateChange.bind(this)
	}

	handleButtonClick(e) {
		this.setState({
			authMode: e.target.id,
		})
	}

	handleChildStateChange(obj) {
		console.log('handleChildStateChange', obj)
	}

	render() {

		const messages = {
			errorUsernameExists: "For security reasons, I can't confirm that you've already signed up... but if I was you, I'd reset your password 😉",
			loginSuccess: "👍 Success! Please check your email for a verification code.",
		}

		return (
			<section className={this.state.authMode}>
				<div>
					<h1>BLEARN</h1>
					<p>A multidimensional learning app? Sounds good to me.</p>
				</div>

				{ this.state.loggedin
						? null
						: <AuthButtons handleClick={this.handleButtonClick} /> }

				{ ( ! this.state.loggedin && (this.state.authMode == 'signup' || this.state.authMode == 'login'))
						? <AuthForm mode={this.state.authMode} updateParentState={this.handleChildStateChange} />
						: null }

				{ this.state.signedup
						? <AuthVerify />
						: null }

			</section>
		);
	}
}
