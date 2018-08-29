import React, { Component } from 'react'
import { connect } from 'react-redux'
import AuthButtons from '../components/auth/buttons'

const mapStateToProps = (state, ownProps) => {
  return {
    authMode: 'defaults'
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick: id => {
      dispatch(setAuthMode(id))
    }
  }
}

const AuthFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthButtons)

export default AuthFormContainer