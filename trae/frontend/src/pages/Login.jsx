import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api.js'
import { setToken } from '../auth.js'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/login', { email, password })
      setToken(res.data.token)
      nav('/dashboard')
    } catch (err) {
      setError(err?.response?.data?.error || 'Login failed')
    }
  }
  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={onSubmit} className="card">
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password (min 8 chars)" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <p>New here? <Link to="/register">Create account</Link></p>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}