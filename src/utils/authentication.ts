import stripe from "../stripe";

let _authToken = ''
let _userId = ''

export const getAuthenticationToken = async (userId: string) => {
  if (!_authToken || _userId !== userId) {
    try {
      const secret = await stripe.apps.secrets.find({
        scope: { type: 'user', user: userId },
        name: 'token',
        expand: ['payload'],
      })
      _authToken = secret.payload
      _userId = userId
    } catch (e) {
      return _authToken
    }
  }
  return _authToken
}

export const saveAuthenticationToken = (userId: string, token: string): Promise<void> => {
  return stripe.apps.secrets.create({
    scope: { type: 'user', user: userId },
    name: 'token',
    payload: token
  })
}

export const clearAuthenticationToken = (userId: string): Promise<void> => {
  return stripe.apps.secrets.deleteWhere({
    scope: { type: 'user', user: userId },
    name: 'token',
  })
}