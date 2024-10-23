export type LoggedInData = {
  userId: number
  userToken: string
}

export type UserAccount = {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: 'admin' | 'user'
}