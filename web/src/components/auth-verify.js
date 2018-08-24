import React, { Component } from 'react'

export default class AuthVerify extends Component {
	constructor(props) {
		super(props)
		this.state = {
			verification: '',
		}

		// bind eventHandlers
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
	}

	handleFormSubmit(e) {
		e.preventDefault()
	}

	handleInputChange(e) {
		const value = e.target.value
		const parentNode = e.target.parentNode

		// update email and password states
		this.setState({
			[e.target.id]: value,
			[`${e.target.id}Length`]: value.length
		})
	}

	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>
				<input className="input-field" type="text" id="verification" name="verification"
							onChange={this.handleInputChange}
							value={this.state.email}
							onBlur={this.validateInput}
							/>
			</form>
		)
	}
}