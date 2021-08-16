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

export interface ISearchClientsQueryResult {
    _id: string
    name: string
    dob: Date
    email: string
    phone: string
    address: {
      city: string
      zipcode: string
      street: string
    }
    created_at: Date
    advisedBy: string
    observations: {
      _id: string
      description: string
      created_at: Date
    }[]  
}


export interface IClientData {
  name: string
  dob: Date
  email: string
  phone: string
  address: {
    city: string
    zipcode: string
    street: string
  }
  advisedBy: string
  observations_count: number
}

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export interface IAppointment {
  _id: string
  client_id: string
  scheduled_to: Date
  created_at: Date
  showed_up: boolean
  clientName: string
}