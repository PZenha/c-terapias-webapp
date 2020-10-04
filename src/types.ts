export interface IClient {
  _id?: string
  name?: string
  dob?: Date
  email?: string
  phone?: string
  gender: 'MALE' | 'FEMALE'
  address?: {
    city?: string
    zipcode?: string
    street?: string
  }
  created_at?: Date
  advisedBy?: string
  observation?: string
}


export interface IUpdateClientInput {
  _id?: string
  name?: string
  dob?: Date
  email?: string
  phone?: string
  gender: 'MALE' | 'FEMALE'
  address?: {
    city?: string
    zipcode?: string
    street?: string
  }
  advisedBy?: string
  observation?: string
}