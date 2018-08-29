import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthMode } from '../actions/auth'
import AuthButtons from '../components/auth/buttons'

const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps', state, ownProps)
  return state
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('mapDispatchToProps', dispatch, ownProps)
  return {
    handleClick: id => {
      console.log('in handle click', id)
      dispatch(setAuthMode(id))
    }
  }
}

const AuthButtonsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthButtons)

export default AuthButtonsContainer