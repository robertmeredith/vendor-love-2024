import { DateValue } from '@nextui-org/react'

export type FormElementProps = {
  name: string
  label?: string
  defaultValue?: string
  required?: boolean
}

export type Vendor = {
  _id: string
  name: string
  instagram: string
  website: string
  email: string
}

export type FormVendor = {
  category: string
  vendor: Vendor
}

export type FormData = {
  client: string
  partner: string
  email: string
  eventDate: DateValue
  vendors: FormVendor[]
}

export type SubmittedForm = {
  client : string
  partner: string
  email: string
  eventDate: string,
  vendors: FormVendor[]
}
