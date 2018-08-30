import React, { Component } from 'react'

// components
import AuthForm from './auth/form'
import AuthButtons from './auth/buttons'
import AuthVerify from './auth/verify'
import AuthMessage from './auth/message'

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
			loggedin: false,
			signedup: false,
			email: '',
			messages: [],
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
			switch (key) {
				case ('signedup'):
				case ('loggedin'):
				case ('email'):
					return this.setState(prevState => {
						return {
							[key]: obj[key],
							messages: (obj[key] === true) ? [] : prevState.messages,
						}
					})
				case ('messages'):
					if ( ! this.state.messages.includes(obj[key]))
						return this.setState( prevState => prevState.messages.push(obj[key]))
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

				{ ! this.state.loggedin
						? <AuthButtons handleClick={this.handleButtonClick} />
						: null }

				{ this.state.messages.map(
					(message, i) => <AuthMessage type='form' message={message} key={i} />
				) }

				{ ( ! this.state.loggedin
					&& ! this.state.signedup
					&& (this.state.authMode == 'signup' || this.state.authMode == 'login') )
						? <AuthForm mode={this.state.authMode} handleParentState={this.handleChildState} />
						: null }

				{ this.state.signedup
						? <AuthVerify email={this.state.email} handleParentState={this.handleChildState} />
						: null }

			</section>
		);
	}
}
