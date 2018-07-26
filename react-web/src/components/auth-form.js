import React, {Component} from 'react'
import Amplify, { API, Auth } from 'aws-amplify';
import aws_exports from '../aws-exports';

import style from './auth-form.css'
import Password from './password'

export default class AuthForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			authMode: props.authMode,
			email: '',
			passwordPrimary: '',
			passwordSecondary: '',
		}
	}

	handleFormSubmit (e) {
		e.preventDefault();
		// await Auth.signUp(this.state.email, this.state.password)
		// 	.then(data => console.log(data))
		// 	.catch(err => console.error(err))
	}

	handleInputChange = (e) => {
		// udpate email and password states
		this.setState({
			[e.target.id]: e.target.value
		})
		// toggle .input-filled class
		if ( ! e.target.value.length) e.target.parentNode.classList.remove('input-filled')
		else e.target.parentNode.classList.add('input-filled')
	}

	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>

				<div className="inputs-container">
					<div className="input">
						<input className="input-field" type="email" id="email" name="email"
									onChange={this.handleInputChange}
									value={this.state.email}
									/>
						<label className="input-label" htmlFor="email">
							<span className="label-content">Email</span>
						</label>
					</div>

					<Password role="Primary"
										onChangeProp={this.handleInputChange}
										valueProp={this.state.passwordPrimary}
										/>

					{ this.state.authMode == 'signup'
						? <Password role="Secondary"
												onChangeProp={this.handleInputChange}
												valueProp={this.state.passwordSecondary}
												/>
						: null }
				</div>

				<button className="input-button" type="submit">CHA CHING!</button>
			</form>
		)
	}
}