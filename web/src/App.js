import React, { Component } from 'react';
// components
import AuthForm from './components/auth-form'
import AuthButtons from './components/auth-buttons'
// styles
import globalStyle from './stylesheets/globals.css'

export default class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			authMode: 'default',
			loggedin: false,
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

				{ this.state.loggedin
						? null
						: <AuthButtons handleClick={this.handleButtonClick} /> }

				{ (this.state.authMode == 'signup' || this.state.authMode == 'login')
						? <AuthForm authMode={this.state.authMode}/>
						: null }

			</section>
		);
	}
}
