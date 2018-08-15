import React, { Component } from 'react';

// components
import AuthForm from './components/auth-form'
// styles
import globalStyle from './stylesheets/globals.css'
import buttonStyles from './stylesheets/button.css'

export default class App extends Component {

	constructor(props){
		super(props)

		this.state = {
			authMode: 'default',
		}

		this.handleButtonClick = this.handleButtonClick.bind(this)
	}

	handleButtonClick(e) {
		this.setState({
			authMode: e.target.id,
		})
	}

	render() {
		return (
			<section className={this.state.authMode}>
				<div>
					<h1>BLEARN</h1>
					<p>A multidimensional learning app? Sounds good to me.</p>
				</div>

				<div className="button-container">
					<button className="input-button" id="signup" onClick={this.handleButtonClick}>
						SIGN UP
					</button>
					<button className="input-button" id="login" onClick={this.handleButtonClick}>
						LOGIN
					</button>
				</div>

				{ (this.state.authMode == 'signup' || this.state.authMode == 'login')
					? <AuthForm authMode={this.state.authMode}/>
					: null }

			</section>
		);
	}
}
