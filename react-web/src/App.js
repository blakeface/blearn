import React, { Component } from 'react';

import AuthForm from './components/auth-form'
import style from './app.css'

export default class App extends Component {

	constructor(props){
		super(props)

		this.state = {
			authMode: false,
		}
	}

	handleButtonClick = e => {
		this.setState({
			authMode: e.target.id,
		})
	}

	render() {
		return (
			<section>
				<div>
					<h1>BLEARN</h1>
					<p>A Multidimensional learning app? Sounds good to me.</p>
				</div>

				<div className="button-container">
					<button className="input-button" id="signup" onClick={this.handleButtonClick}>
						SIGN UP
					</button>
					<button className="input-button" id="login" onClick={this.handleButtonClick}>
						LOGIN
					</button>
				</div>

				{ this.state.authMode ? <AuthForm authMode={this.state.authMode}/> : null }

			</section>
		);
	}
}
