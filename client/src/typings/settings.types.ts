import { VendorPrivate } from './vendor.types'
import { UserAccount } from './user.types'

export type SettingsFormData = {
  categories: string[]
  business: {
    includeOnForm: boolean
    category: string
    vendor: VendorPrivate
  }
}

export type UserAccountAndSettings = {
  account: UserAccount
  settings: SettingsFormData
}
