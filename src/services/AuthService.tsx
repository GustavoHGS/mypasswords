import api from '../api'

const AuthService = {
  async login(email: string, password: string) {
    const res = await api.post('/login', { email, password })
    return res.data
  },
}

export default AuthService
