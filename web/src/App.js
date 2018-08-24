import React, { Component } from 'react';
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
			authMode: 'default',
			loggedin: false,
			errors: [],
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

	handleChildStateChange(err) {
		console.log('handleChildStateChange', err)
	}

	render() {
		return (
			<section className={this.state.authMode}>
				<div>
					<h1>BLEARN</h1>
					<p>A multidimensional learning app? Sounds good to me.</p>
				</div>

				{ this.state.loggedin
						? null
						: <AuthButtons handleClick={this.handleButtonClick} /> }

				{ (this.state.authMode == 'signup' || this.state.authMode == 'login')
						? <AuthForm authMode={this.state.authMode} updateParentState={this.handleChildStateChange} />
						: null }

				{ this.state.loggedin
						? <AuthVerify />
						: null }

			</section>
		);
	}
}
