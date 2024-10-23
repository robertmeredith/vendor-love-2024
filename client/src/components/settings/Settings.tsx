import { Button } from '@nextui-org/react'
import { useState } from 'react'
import { useGetUserSettings } from '@/hooks/settingsQueries'
import { useGetUser } from '@/hooks/userQueries'
import { Loading } from '@/components'
import AccountForm from './AccountPage'
import FormSettingsPage from './FormSettingsPage'
import { defaultWeddingCategories } from '@/helpers'
import BusinessPage from './BusinessPage'

type SettingsPages = 'Account' | 'Business Profile' | 'Form Settings'

const settingsPages: SettingsPages[] = [
  'Account',
  'Business Profile',
  'Form Settings',
]

function Settings() {
  const [currentPage, setCurrentPage] = useState<SettingsPages>('Account')

  // get user settings
  const {
    data: settings,
    isPending: settingsIsLoading,
    isError: settingsIsError,
    error: settingsError,
  } = useGetUserSettings()

  // get user account
  const {
    data: user,
    isPending: accountIsLoading,
    isError: accountIsError,
    error: accountError,
  } = useGetUser()

  // ERROR OR ISLOADING
  if (settingsIsLoading || accountIsLoading) return <Loading />
  if (settingsIsError || accountIsError)
    return <div>{settingsError?.message || accountError?.message}</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4">
      <div className="md:col-span-1 ">
        <ul>
          {/* TODO: sidebar with different settings pages 
            fix on very narrow pages */}
          <ul className="flex flex-row md:flex-col gap-4 md:px-2">
            {settingsPages.map((page) => (
              <li key={page} className="flex-grow">
                <Button className="w-full" onClick={() => setCurrentPage(page)}>
                  {page}
                </Button>
              </li>
            ))}
          </ul>
        </ul>
      </div>
      <div className="md:col-span-3 flex flex-col">
        {/* Account */}
        {currentPage === 'Account' && <AccountForm user={user} />}

        {/* Business Profile */}
        {currentPage === 'Business Profile' && (
          <BusinessPage settings={settings} />
        )}

        {/* Preferences */}
        {currentPage === 'Form Settings' && (
          <FormSettingsPage
            settings={settings}
            defaultCategories={defaultWeddingCategories}
          />
        )}
      </div>
    </div>
  )
}
export default Settings
