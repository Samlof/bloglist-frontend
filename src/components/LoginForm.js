import React, { useState } from 'react'
import loginService from '../services/login'

const LoginForm = (props) => {
  const { login } = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitForm = async e => {
    e.preventDefault()
    const user = await loginService.login({ username, password })
    setUsername('')
    setPassword('')

    login(user)
  }
  return (
    <form>
      <div>
        käyttäjätunnus:
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        salasana:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={submitForm}>Kirjaudu</button>
      </div>
    </form>
  )
}

export default LoginForm