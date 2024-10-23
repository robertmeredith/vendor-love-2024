import {
  useForm,
  useFieldArray,
  Controller,
  type SubmitHandler,
} from 'react-hook-form'

// Icon
import { Delete } from 'lucide-react'

// Default Next Components
import { DatePicker } from '@nextui-org/date-picker'
import { Divider } from '@nextui-org/divider'
import { Button } from '@nextui-org/button'

// Custom Next Components
import CategoryAutoComplete from './NextUi/CategoryAutoComplete'
import NextAutoComplete from './NextUi/VendorAutoComplete'
import NextInput from './NextUi/NextInput'
import { EventFormSkeleton } from '@/components'

import { type Vendor } from './types'

// Import query
import { useGetAllUserVendors } from '@/hooks/vendorQueries'

// Import mutation
import { useCreateEvent } from '@/hooks/eventMutations'

// Mock Data
import {
  createEmptyVendor,
  convertCalendarDateToDate,
  formatInstagramUsername,
  formatUrl,
} from '@/helpers'
import { zodResolver } from '@hookform/resolvers/zod'
import { EventFormSchema } from '@/utils/zod.validation'
import { useGetUserSettings } from '@/hooks/settingsQueries'
import { useEffect } from 'react'
import { EventFormData } from '@/typings/event.types'

// Default Values
const defaultValues: EventFormData = {
  client: '',
  clientInstagram: '',
  partner: '',
  email: '',
  partnerInstagram: '',
  eventDate: null,
  vendors: [],
}

const UserEventForm = () => {
  // Create Event Mutation
  const { mutate: createEvent } = useCreateEvent()

  // Fetch vendor categories from the server
  const { data: settings, isLoading: isLoadingSettings } = useGetUserSettings()
  // Fetch vendors from the server
  const { data: allUserVendors, isLoading: isLoadingVendors } =
    useGetAllUserVendors()

  // Log Values
  // console.log('DEFAULT VALUES ', settings?.userSettings.defaultVendorTypes)
  // console.log('VENDORS ', allUserVendors)
  console.log('SETTINGS ', settings)

  // Initialise form with default values
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EventFormData>({
    defaultValues,
    resolver: zodResolver(EventFormSchema),
  })

  // LOG all form values on change
  const formValues = watch() // This will give you the current form state
  console.log('Current form values: ', formValues)

  const {
    fields: vendorRows,
    // used for adding new rows to form wheb 'add row' button clicked
    append,
    // used for removing rows from form when 'remove row' button clicked
    remove,
    // used for replacing the default array of vendor fields once the users default vendors are fetched
    replace,
    insert,
  } = useFieldArray({
    control,
    name: 'vendors',
  })



  // On selecting a vendor from the autocomplete dropdown, fill in the details
  const fillExistingVendorsDetails = (index: number, key: string) => {
    // Find vendor matching the vendor that was selected

    const existingVendor = allUserVendors?.vendors.find(
      (vendor) => vendor._id === key
    ) as Vendor
    if (existingVendor) {
      setValue(`vendors.${index}.vendor`, existingVendor)
    } else {
      setValue(`vendors.${index}.vendor`, {
        name: '',
        instagram: '',
        website: '',
        email: '',
      })
    }
  }

  // Form Submit Handler
  const onSubmit: SubmitHandler<EventFormData> = (data: EventFormData) => {
    if (data.eventDate) {
      // convert CalendarDate to Date string
      const formattedDate = convertCalendarDateToDate(data.eventDate)

      createEvent({
        ...data,
        eventDate: formattedDate,
      })
      return
    }
  }

  // LOG ERRORS
  console.log('ERRORS ', errors)

  // Replace the default array of vendor fields once the users default vendors are fetched
  useEffect(() => {
    if (settings) {
      replace(
        settings.categories.map((category) => createEmptyVendor(category))
      )
    }
    if (settings?.business.includeOnForm) {
      // make first row of form have user business details
      setValue(`vendors.0.category`, settings.business.category)
      setValue(`vendors.0.vendor`, settings.business.vendor)
    }
  }, [settings])

  // Render Skeleton while loading
  if (isLoadingVendors || isLoadingSettings) {
    return <EventFormSkeleton />
  }


  // console.log('VENDOR ERROR ', errors.vendors?.[0]?.category?.message)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        {/* CLIENT */}
        <Controller
          name="client"
          control={control}
          render={({ field }) => (
            <NextInput
              {...field}
              label="Your name"
              isRequired={true}
              isInvalid={!!errors.client?.message}
              errorMessage={errors.client?.message}
            />
          )}
        />

        {/* CLIENT INSTAGRAM */}
        <Controller
          control={control}
          name={`clientInstagram`}
          render={({ field }) => (
            <NextInput
              {...field}
              label=" Your Instagram"
              startContent="@"
              onBlur={() => {
                // format Instagram input to just be the username
                field.onChange(formatInstagramUsername(field.value || ''))
              }}
            />
          )}
        />

        {/* CIENT EMAIL */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <NextInput
              {...field}
              label="Email"
              isInvalid={!!errors.email?.message}
              errorMessage={errors.email?.message}
            />
          )}
        />

        {/* PARTNER */}
        <Controller
          name="partner"
          control={control}
          render={({ field }) => (
            <NextInput
              {...field}
              label="Partner name"
              isInvalid={!!errors.partner?.message}
              errorMessage={errors.partner?.message}
            />
          )}
        />

        {/* PARTNER INSTAGRAM */}
        <Controller
          control={control}
          name={`partnerInstagram`}
          render={({ field }) => (
            <NextInput
              {...field}
              label="Partners Instagram"
              startContent="@"
              onBlur={() => {
                // format Instagram input to just be the username
                field.onChange(formatInstagramUsername(field.value || ''))
              }}
            />
          )}
        />

        {/* DATEPICKER - locale hardcoded to en-AU for now in main.tsx */}
        <Controller
          name="eventDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Event Date"
              isRequired
              isInvalid={!!errors.eventDate?.message}
              errorMessage={errors.eventDate?.message}
            />
          )}
        />
      </div>

      {/* VENDORS SECTION */}

      <Divider className="my-10" />

      {/* VENDOR LIST - map over fields (vendorRows) and create row for each one */}
      {vendorRows.map((field, index) => {
        return (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-[repeat(5,1fr)_auto] mt-4 gap-2 items-center"
            key={field.id}
          >
            {/* VENDOR NUMBER - only visible on mobile */}
            <div className="flex items-center mt-6 col-span-full lg:hidden pl-1.5">
              <h4>Vendor</h4>
              <Button
                className={`ml-auto md:ml-6 ${index === 0 && 'invisible'}`}
                color="danger"
                variant="light"
                size="sm"
                onClick={() => remove(index)}
              >
                Remove Row
              </Button>
            </div>

            {/* CATEGORY*/}
            <div className="sm:col-span-2 lg:col-span-1">
              <Controller
                control={control}
                name={`vendors.${index}.category`}
                render={({ field }) => (
                  <CategoryAutoComplete
                    {...field}
                    options={settings?.categories || []}
                    label="Category"
                    isInvalid={!!errors.vendors?.[index]?.category?.message}
                  />
                )}
              />
            </div>

            {/* NAME */}
            <Controller
              control={control}
              name={`vendors.${index}.vendor.name`}
              render={({ field }) => (
                <NextAutoComplete
                  {...field}
                  options={allUserVendors?.vendors || []}
                  label="Vendor Name"
                  handleSelectionChange={(key) => {
                    fillExistingVendorsDetails(index, key)
                  }}
                />
              )}
            />

            {/* INSTAGRAM */}
            <Controller
              control={control}
              name={`vendors.${index}.vendor.instagram`}
              render={({ field }) => (
                <NextInput
                  label="instagram"
                  startContent="@"
                  {...field}
                  onBlur={() => {
                    // format Instagram input to just be the username
                    field.onChange(formatInstagramUsername(field.value || ''))
                  }}
                />
              )}
            />

            {/* WEBSITE */}
            <Controller
              control={control}
              name={`vendors.${index}.vendor.website`}
              render={({ field }) => (
                <NextInput
                  label="website"
                  startContent="www."
                  {...field}
                  onBlur={() => {
                    // format URL input to just be the website without https://www.
                    field.onChange(formatUrl(field.value || ''))
                  }}
                />
              )}
            />

            {/* EMAIL */}
            <Controller
              control={control}
              name={`vendors.${index}.vendor.email`}
              render={({ field }) => (
                <NextInput
                  label="email"
                  {...field}
                  isInvalid={!!errors.vendors?.[index]?.vendor?.email?.message}
                />
              )}
            />

            {/* DELETE BUTTON */}
            <Button
              // hidden on first row and invisible on mobile
              className={`${index === 0 && 'invisible'} hidden lg:flex max-w-6`}
              isIconOnly
              color="danger"
              aria-label="Delete row"
              size="lg"
              variant="light"
              onClick={() => remove(index)}
            >
              <Delete className="h-5 w-5" />
            </Button>
          </div>
        )
      })}
      <Divider className="my-10" />
      <div className="flex gap-2">
        <Button
          type="button"
          onClick={() => append(createEmptyVendor())}
          variant="bordered"
        >
          Add Row
        </Button>
        <Button type="submit" className="bg-foreground text-white">
          Submit
        </Button>
      </div>
    </form>
  )
}

export default UserEventForm

