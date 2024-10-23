import { VendorPrivate, VendorPublic } from './vendor.types'
import { VendorFormData } from '@/utils/zod.validation'
import { DateValue } from '@nextui-org/react'

export type EventListQueryResult = {
  count: number
  events: DatabaseEvent[]
}

export type EventQueryResult = {
  event: DatabaseEvent
}

// Event Data from Database
export type DatabaseEvent = {
  _id: string
  user: string
  client: string
  clientInstagram: string
  email: string
  partner: string
  partnerInstagram: string
  eventDate: string
  createdAT?: string
  updatedAt?: string
  vendors: {
    category: string
    vendor: VendorPrivate | VendorPublic
    _id: string
  }[]
}

// Event Data with Date as DateValue for Form
export type CompletedEventFormData = {
  _id: string
  user: string
  client: string
  clientInstagram: string
  email: string
  partner: string
  partnerInstagram: string
  eventDate: DateValue
  createdAT?: string
  updatedAt?: string
  vendors: {
    category: string
    vendor: VendorPrivate | VendorFormData
    _id?: string
  }[]
}

// Event Data for Updating Event
export type UpdatedEventFormData = {
  _id: string
  user: string
  client: string
  clientInstagram: string
  email: string
  partner: string
  partnerInstagram: string
  eventDate: string
  createdAT?: string
  updatedAt?: string
  vendors: {
    category: string
    vendor: VendorPrivate | VendorFormData
    _id?: string
  }[]
}


// Event Data for Creating Event with Date as DateValue
export type EventFormData = {
  client: string
  clientInstagram: string
  partner: string
  partnerInstagram: string
  email: string
  eventDate: DateValue | null
  vendors: {
    category: string
    vendor: VendorFormData
  }[]
}

// Event Data for Submitting Event with Date as DateString
export type SubmittedEventFormData = {
  client: string
  clientInstagram: string
  partner: string
  partnerInstagram: string
  email: string
  eventDate: string
  vendors: {
    category: string
    vendor: VendorFormData
  }[]
}

