import React, { Component } from 'react'

export default class App extends Component {

	handleFormSubmit(e) {
		e.preventDefault();
		console.log('form data:', e)
	}

	handleInputFocus(e) {
		e.target.parentNode.classList.add('input-filled')
	}

	handleInputBlur(e) {
		if ( ! e.target.value.length) e.target.parentNode.classList.remove('input-filled')
	}

	render() {
		return (
			<section>
				<div>
					<h1>BLEARN</h1>
					<p>A Multidimensional learning app? Sounds good to me.</p>
				</div>

				<form onSubmit={this.handleFormSubmit}>

					<div className="inputs-container">
						<div className="input">
							<input onFocus={this.handleInputFocus} onBlur={this.handleInputBlur}
										className="input-field" type="email" id="email" name="email" />
							<label className="input-label" htmlFor="email">
								<span className="label-content">Email</span>
							</label>
						</div>

						<div className="input">
							<input onFocus={this.handleInputFocus} onBlur={this.handleInputBlur}
										className="input-field" type="password" id="password" name="password" />
							<label className="input-label" htmlFor="email">
								<span className="label-content">Password</span>
							</label>
						</div>
					</div>

					<button className="input-button" type="submit">CHA CHING!</button>
				</form>
			</section>
		);
	}
}
