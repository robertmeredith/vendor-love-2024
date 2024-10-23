import { Button, Input } from '@nextui-org/react'
// importController,  react-hook-form
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import { toast } from '../ui/use-toast'
import { SettingsFormData } from '@/typings/settings.types'
import { useUpdateSettings } from '@/hooks/settingsMutations'
import CategoryAutoComplete from '../forms/NextUi/CategoryAutoComplete'


// TODO: create Schema and add in zod file

const defaultFormValues: SettingsFormData = {
  categories: [],
  business: {
    includeOnForm: false,
    category: '',
    vendor: {
      isUser: false,
      isVerified: true,
      _id: '',
      user: '',
      alias: '',
      name: '',
      email: '',
      instagram: '',
      website: '',
      notes: '',
    },
  },
}

function BusinessPage({ settings }: { settings: SettingsFormData }) {
  const { mutate: updateSettings } = useUpdateSettings()

  // use react-hook-form to manage the form state
  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<SettingsFormData>({
    defaultValues: settings || defaultFormValues,
  })

  // SUBMIT HANDLER
  const onSubmit: SubmitHandler<SettingsFormData> = (data) => {
    console.log('SETTINGS FORM DATA', data)

    // use useUpdateSettings mutation to update the settings
    updateSettings(data, {
      onSuccess: () => {
        toast({
          title: 'Settings updated',
          description: 'Your settings have been updated',
        })
        reset(data)
      },
      onError: (error) => {
        console.log('Error updating settings:', error)
      },
    })
  }


  // if settings is undefined, send notification
  if (!settings) {
    toast({
      title: 'Settings not found',
      description: 'Please try again',
    })  
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* CATEGORY */}
      <Controller
        control={control}
        name={'business.category'}
        render={({ field }) => (
          <CategoryAutoComplete
            key={field.value}
            {...field}
            // onChange={(value) => field.onChange(value)}
            options={settings?.categories}
            label="Category"
            labelPlacement="outside"
          />
        )}
      />

      {/* Business Name */}

      <Controller
        name="business.vendor.name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Your Business Name"
            // description="This is the name that will be displayed on your profile and in emails."
            // variant="bordered"
            placeholder=" "
            labelPlacement="outside"
          />
        )}
      />
      {/* Alias */}

      <Controller
        name="business.vendor.alias"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Also Known As"
            description="A name that people might also use when searching for your business, often your own name"
            // variant="bordered"
            placeholder=" "
            labelPlacement="outside"
          />
        )}
      />

      {/* Email */}

      <Controller
        name="business.vendor.email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Email address"
            description="How people can reach you"
            // variant="bordered"
            placeholder=" "
            labelPlacement="outside"
          />
        )}
      />

      {/* Instagram Username */}

      <Controller
        name="business.vendor.instagram"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Instagram"
            description="Your instagram username"
            placeholder=" "
            labelPlacement="outside"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">@</span>
              </div>
            }
          />
        )}
      />

      {/* Website */}

      <Controller
        name="business.vendor.website"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Website"
            description="Your website URL"
            // variant="bordered"
            placeholder=" "
            labelPlacement="outside"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">
                  https://www.
                </span>
              </div>
            }
          />
        )}
      />
      <Button isDisabled={!isDirty} className="w-full md:w-32" variant="ghost" color="primary" type="submit">
        Save Details
      </Button>
    </form>
  )
}
export default BusinessPage
