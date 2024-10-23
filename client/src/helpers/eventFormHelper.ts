// import { v4 as uuid } from 'uuid'
import { Vendor } from '@/typings/vendor.types'

// date handling
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export const defaultVendorCategories: string[] = [
  'Venue',
  // 'Ceremony Venue',
  // 'Photographer',
  // 'Videographer',
  // 'Celebrant',
  // 'Dress Designer',
  // 'Dress Shop',
  // 'Hair',
  // 'MUA',
  // 'Florist',
  // 'Cake',
  // 'Catering',
  // 'Stationery',
  // 'Band',
  // 'DJ',
  // 'Transport',
  // 'Styling',
]

// Generate ID for adding to vendor object
// const generateId = (): string => `${Date.now()}-${Math.random().toString(36)}`

// Function to create empty vendor object
export const createEmptyVendor = (
  category?: string
): { category: string; vendor: Vendor } => {
  return {
    category: category || '',
    vendor: {
      name: '',
      instagram: '',
      website: '',
      email: '',
    },
  }
}
