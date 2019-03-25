import React from 'react'
import PropTypes from 'prop-types'

import loginService from '../services/login'
import { useField } from '../hooks'

const LoginForm = (props) => {
  const { login, setErrorMessage, setNotificatioMessage } = props
  const [resetUsername, username] = useField('text')
  const [resetPassword, password] = useField('password')

  const submitForm = async e => {
    e.preventDefault()
    let user
    try {
      user = await loginService.login({
        username: username.value,
        password: password.value
      })
    } catch (e) {
      setErrorMessage(e.response.data.error)
      return
    }
    resetUsername()
    resetPassword()

    setNotificatioMessage('Kirjauduttiin sisään')
    login(user)
  }
  return (
    <form>
      <div>
        käyttäjätunnus:
        <input {...username} />
      </div>
      <div>
        salasana:
        <input {...password} />
      </div>
      <div>
        <button onClick={submitForm}>Kirjaudu</button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setNotificatioMessage: PropTypes.func.isRequired,
}

export default LoginForm