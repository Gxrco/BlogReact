import { loginUser } from './fetchData'

export async function authenticate (username, password) {
  const response = await loginUser(username, password)

  if (response.token) {
    localStorage.setItem('token', response.token)
    return true
  }
  console.error(response.error)
  return false
}
