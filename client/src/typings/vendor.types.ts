import { DatabaseEvent } from './event.types'

export type Vendor = {
  name: string
  instagram: string
  website: string
  email: string
}

export type VendorPublic = Vendor & {
  _id: string
  user: string
  alias: string
}

export type VendorPrivate = VendorPublic & {
  notes: string
  isUser: boolean
  isVerified: boolean
}

export type VendorQueryResult = {
  vendor: VendorPrivate
  events: DatabaseEvent[]
}

export type VendorListQueryResult = {
  vendors: VendorPrivate[]
  count: number
  // totalItems: number
  // currentPage: number
  // totalPages: number
  // hasNextPage: boolean
  // hasPreviousPage: boolean
}
