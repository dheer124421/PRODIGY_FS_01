import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

export default function Dashboard() {
  const { user, token, logout } = useAuth()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    axios.get(`${API_BASE}/protected/profile`, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => setProfile(res.data.user))
      .catch(() => setProfile(null))
  }, [token])

  return (
    <div className="card">
      <div className="row-between">
        <h2>Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>
      <p>Welcome, {user?.name}</p>
      {profile && (
        <div className="profile">
          <div><strong>Name:</strong> {profile.name}</div>
          <div><strong>Email:</strong> {profile.email}</div>
          <div><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleString()}</div>
        </div>
      )}
    </div>
  )
}


