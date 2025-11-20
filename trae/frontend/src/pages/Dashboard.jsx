import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api.js'
import { clearToken } from '../auth.js'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const nav = useNavigate()

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/me')
        setUser(res.data)
      } catch (err) {
        setError('Unauthorized')
      }
    }
    load()
  }, [])

  function logout() {
    clearToken()
    nav('/login')
  }

  return (
    <div className="container">
      <h1>Dashboard</h1>
      {user ? (
        <div className="card">
          <div>Email: {user.email}</div>
          <div>Created: {new Date(user.created_at).toLocaleString()}</div>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="card">
          <div>{error || 'Loading...'}</div>
        </div>
      )}
    </div>
  )
}