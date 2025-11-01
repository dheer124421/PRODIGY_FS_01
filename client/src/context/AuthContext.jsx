import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      axios.get(`${API_BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` }})
        .then(res => setUser(res.data.user))
        .catch(() => { setUser(null); setToken(''); localStorage.removeItem('token') })
        .finally(() => setIsLoading(false))
    } else {
      localStorage.removeItem('token')
      setIsLoading(false)
    }
  }, [token])

  const login = async (email, password) => {
    const res = await axios.post(`${API_BASE}/auth/login`, { email, password })
    setToken(res.data.token)
    setUser(res.data.user)
  }

  const register = async (name, email, password) => {
    await axios.post(`${API_BASE}/auth/register`, { name, email, password })
    // auto-login after registration
    await login(email, password)
  }

  const logout = () => { setToken(''); setUser(null); localStorage.removeItem('token') }

  const value = useMemo(() => ({ token, user, login, register, logout, isAuthenticated: !!token, isLoading }), [token, user, isLoading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}


