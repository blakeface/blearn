import React, { Component } from 'react'

// components
import AuthForm from './form'
import AuthButtons from './buttons'
import AuthVerify from './verify'
import AuthMessage from './message'

export default class authContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			authMode: 'default', // ['default', 'signup', 'login']
			signedup: false,
			verified: false,
			loggedin: false,
			email: '',
			message: '',
		}

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
			console.log(key, obj[key])
			switch (key) {
				case ('signedup'):
					if (obj[key]) this.setState({
						message: 'signupSuccess',
						authMode: 'default',
						message: '',
					})
					break
				case ('verified'):
					if (obj[key]) this.setState({
						message: 'verifySuccess',
						authMode: 'login',
						message: '',
					})
					break
				case ('loggedin'):
					if (obj[key]) {
						this.setState({ message: '' })
						this.props.updateAuthState(false)
					}
					break
				case ('email'):
				case ('message'):
				case ('authMode'):
					return this.setState(prevState => {
						return {
							[key]: obj[key]
						}
					})
			}
		})
	}

	render() {
		return (
			<section className={this.state.authMode}>
				<div>
					<h1>BLEARN</h1>
					<p>A multidimensional learning app? Sounds good to me.</p>
				</div>

				<AuthButtons handleClick={this.handleButtonClick} />

				{ this.state.message ? <AuthMessage type='form' message={this.state.message} /> : null }

				{ (this.state.authMode == 'signup' || this.state.authMode == 'login')
						? <AuthForm mode={this.state.authMode} handleParentState={this.handleChildState} />
						: null }

				{ this.state.signedup && ! this.state.verified
						? <AuthVerify email={this.state.email} handleParentState={this.handleChildState} />
						: null }
			</section>
	)}
}
