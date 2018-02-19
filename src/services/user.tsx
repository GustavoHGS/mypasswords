import apiProd from '../api'

const UserService = {
  async login(email: string, password: string) {
    const res = await apiProd.post('/login', { email, password })
    return res.data
  },
  async register(name: string, email: string, password: string) {
    const res = await apiProd.post('/register', { name, email, password })
    return res.data
  },

}

export default UserService
