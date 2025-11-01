import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(name, email, password)
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="card">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <label>Name</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} required />
        <label>Email</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <small>Min 8 chars incl. letter and number</small>
        {error && <div className="error">{error}</div>}
        <button disabled={loading} type="submit">{loading ? 'Creating...' : 'Create Account'}</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}


