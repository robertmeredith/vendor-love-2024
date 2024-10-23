import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
} from 'react-hook-form'
import NextInput from './NextUi/NextInput'
import { DatabaseEvent, CompletedEventFormData } from '@/typings/event.types'
import { useState } from 'react'
import { Button, Divider, DatePicker } from '@nextui-org/react'
import { EventFormSkeleton } from '@/components'
import { useGetUserSettings } from '@/hooks/settingsQueries'
import VendorAutoComplete from './NextUi/VendorAutoComplete'
import { useGetAllUserVendors } from '@/hooks/vendorQueries'
import CategoryAutoComplete from './NextUi/CategoryAutoComplete'
import {
  createEmptyVendor,
  convertCalendarDateToDate,
  convertDateToCalendarDate,
  formatInstagramUsername,
} from '@/helpers'

// Icons
import { Delete, ClipboardCopy } from 'lucide-react' 

// Toast
import { toast } from '@/components/ui/use-toast'

// zod validation
import { EventFormSchema } from '@/utils/zod.validation'
import { zodResolver } from '@hookform/resolvers/zod'

// mutations
import { useDeleteEvent, useUpdateEvent } from '@/hooks/eventMutations'

// Props
type Props = {
  event: DatabaseEvent
  // used for determining if the instagram username copy to clipboard should include the category
  includeCategory?: boolean
}

const CompletedEventForm = ({ event, includeCategory }: Props) => {
  const [isReadOnly, setIsReadOnly] = useState(true)

  // console.log('EVENT ', event)

  // Fetch user settings and vendors
  const { data: settings, isPending: isLoadingSettings } = useGetUserSettings()
  const { data: allUserVendors, isPending: isLoadingVendors } =
    useGetAllUserVendors()

  // Mutations
  const { mutate: deleteEvent } = useDeleteEvent()
  const { mutateAsync: updateEvent, isPending: isUpdatingEvent } =
    useUpdateEvent()

  // Create form default values
  const formDefaultValues = {
    ...event,
    eventDate: convertDateToCalendarDate(event?.eventDate),
    // map over vendors and if vendor is null replace with empty vendor
    vendors: event?.vendors.map((vendor) =>
      vendor.vendor === null ? createEmptyVendor(vendor.category) : vendor
    ),
  }

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CompletedEventFormData>({
    defaultValues: formDefaultValues,
    resolver: zodResolver(EventFormSchema),
  })

  // LOG FORM VALUES + ERRORS
  const formValues = watch() // This will give you the current form state
  console.log('Current form values: ', formValues)
  console.log('ERRORS ', errors)

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vendors',
  })

  // On selecting a vendor from the autocomplete dropdown, fill in the details
  const fillExistingVendorsDetails = (index: number, key: string) => {
    // Find vendor matching the vendor that was selected
    const existingVendor = allUserVendors?.vendors.find(
      (vendor) => vendor._id === key
    )
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

  const onSubmit: SubmitHandler<CompletedEventFormData> = async (
    data: CompletedEventFormData
  ) => {
    console.log('DATA ', data)
    // convert CalendarDate to Date string
    const formattedDate = convertCalendarDateToDate(data.eventDate)

    await updateEvent({
      ...data,
      eventDate: formattedDate,
    })
    setIsReadOnly(true)
  }

  if (isLoadingSettings || isLoadingVendors) return <EventFormSkeleton />

  
  // Reset form back to original values
  const revertChanges = () => {
    setIsReadOnly(true)
    reset(formDefaultValues)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {/* CLIENT */}

        <Controller
          name="client"
          control={control}
          render={({ field }) => (
            <NextInput {...field} label="Client name" readOnly={isReadOnly} />
          )}
        />
        {/* CLIENT INSTAGRAM */}
        <Controller
          control={control}
          name={`clientInstagram`}
          render={({ field }) => (
            <NextInput
              {...field}
              readOnly={isReadOnly}
              label=" Client Instagram"
              startContent="@"
              endContent={
                isReadOnly && (
                  <Button
                    isIconOnly
                    size="sm"
                    color="primary"
                    className="opacity-80"
                    variant="light"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        includeCategory
                          ? `${formValues.client} | @${field.value}`
                          : `@${field.value}`
                      )
                      toast({
                        title: 'Copied to clipboard',
                      })
                    }}
                  >
                    <ClipboardCopy className="h-5 w-5 " />
                  </Button>
                )
              }
              onBlur={() => {
                // format Instagram input to just be the username
                field.onChange(formatInstagramUsername(field.value || ''))
              }}
            />
          )}
        />

        {/* EMAIL */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <NextInput {...field} label="Email" readOnly={isReadOnly} />
          )}
        />

        {/* PARTNER */}
        <Controller
          name="partner"
          control={control}
          render={({ field }) => (
            <NextInput {...field} label="Partner name" readOnly={isReadOnly} />
          )}
        />

        {/* PARTNER INSTAGRAM */}
        <Controller
          control={control}
          name={`partnerInstagram`}
          render={({ field }) => (
            <NextInput
              {...field}
              readOnly={isReadOnly}
              label="Partners Instagram"
              startContent="@"
              endContent={
                isReadOnly && (
                  <Button
                    isIconOnly
                    size="sm"
                    color="primary"
                    className="opacity-80"
                    variant="light"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        includeCategory
                          ? `${formValues.partner} | @${field.value}`
                          : `@${field.value}`
                      )
                      toast({
                        title: 'Copied to clipboard',
                      })
                    }}
                  >
                    <ClipboardCopy className="h-5 w-5 " />
                  </Button>
                )
              }
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
              label="Date"
              isReadOnly={isReadOnly}
              isInvalid={!!errors.eventDate?.message}
              errorMessage={errors.eventDate?.message}
            />
          )}
        />
      </div>

      {/* VENDOR SECTION */}

      <Divider className="mt-10" />

      {fields.map((field, index) => {
        return (
          <div
            className={`grid sm:grid-cols-2 lg:grid-cols-5 mt-4 gap-2 items-center ${
              !isReadOnly && 'lg:grid-cols-[repeat(5,1fr)_auto]'
            }`}
            key={field.id}
          >
            {/* VENDOR NUMBER - only visible on mobile */}
            <div className="flex items-center mt-6 col-span-full lg:hidden ">
              <h4>Vendor</h4>
              {!isReadOnly && (
                <Button
                  className="ml-auto md:ml-6"
                  color="danger"
                  variant="light"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  Remove Row
                </Button>
              )}
            </div>
            {/* CATEGORY */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Controller
                control={control}
                name={`vendors.${index}.category`}
                render={({ field }) => (
                  <CategoryAutoComplete
                    {...field}
                    isReadOnly={isReadOnly}
                    options={settings?.categories || []}
                    label="Category"
                    isInvalid={!!errors.vendors?.[index]?.category?.message}
                  />
                )}
              />
            </div>
            {/* VENDOR  NAME */}
            <Controller
              control={control}
              name={`vendors.${index}.vendor.name`}
              render={({ field }) => (
                <VendorAutoComplete
                  {...field}
                  isReadOnly={isReadOnly}
                  options={allUserVendors?.vendors || []}
                  label="Vendor name"
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
                  {...field}
                  readOnly={isReadOnly}
                  label="instagram"
                  startContent="@"
                  endContent={
                    isReadOnly && (
                      <Button
                        isIconOnly
                        size="sm"
                        color="primary"
                        className="opacity-80"
                        variant="light"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            includeCategory
                              ? // include category that corresponds to this row
                                `${formValues.vendors[index].category} | @${field.value}`
                              : `@${field.value}`
                          )
                          toast({
                            title: 'Copied to clipboard',
                          })
                        }}
                      >
                        <ClipboardCopy className="h-5 w-5 " />
                      </Button>
                    )
                  }
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
                  {...field}
                  readOnly={isReadOnly}
                  label="website"
                  startContent="www."
                  endContent={
                    isReadOnly && (
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="primary"
                        className="opacity-80"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `www.${field.value}` || ''
                          )
                          toast({
                            title: 'Copied to clipboard',
                          })
                        }}
                      >
                        <ClipboardCopy className="h-5 w-5 " />
                      </Button>
                    )
                  }
                />
              )}
            />
            {/* EMAIL */}
            <Controller
              control={control}
              name={`vendors.${index}.vendor.email`}
              render={({ field }) => (
                <NextInput
                  {...field}
                  readOnly={isReadOnly}
                  label="email"
                  isInvalid={!!errors.vendors?.[index]?.vendor?.email?.message}
                  endContent={
                    isReadOnly && (
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="primary"
                        className="opacity-80"
                        onClick={() => {
                          navigator.clipboard.writeText(field.value || '')
                          toast({
                            title: 'Copied to clipboard',
                          })
                        }}
                      >
                        <ClipboardCopy className="h-5 w-5 " />
                      </Button>
                    )
                  }
                />
              )}
            />

            {/* DELETE BUTTON - hidden on isReadOnly*/}
            {!isReadOnly && (
              <Button
                // hidden on first row and invisible on mobile
                className={`${
                  index === 0 && 'invisible'
                } hidden lg:flex max-w-6`}
                isIconOnly
                color="danger"
                aria-label="Delete row"
                size="lg"
                variant="light"
                onClick={() => remove(index)}
              >
                <Delete className="h-5 w-5" />
              </Button>
            )}

            {/* Bottom Divider - visible on smaller screens */}
            <Divider className="mt-8 col-span-full lg:hidden" />
          </div>
        )
      })}

      <div className="flex gap-2 mt-10 md:justify-end ">
        <Button
          // onClick={() => setIsReadOnly(!isReadOnly)}
          onClick={revertChanges}
          variant="light"
          type="button"
          color="default"
          className={isReadOnly ? 'hidden' : ''}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="bordered"
          className={isReadOnly ? 'hidden' : ''}
          onClick={() => append(createEmptyVendor())}
        >
          Add Row
        </Button>
        {/* EDIT BUTTON */}
        {isReadOnly && (
          <Button
            type="button"
            color="default"
            variant="light"
            onClick={() => {
              setIsReadOnly(!isReadOnly)
            }}
          >
            Edit
          </Button>
        )}
        {/*  */}
        {!isReadOnly && (
          <Button type="submit" color="success">
            {isUpdatingEvent ? 'Updating...' : 'Save Changes'}
          </Button>
        )}
        <Button
          type="button"
          color="danger"
          className={!isReadOnly ? 'hidden' : ''}
          onClick={() => deleteEvent(event._id)}
        >
          Delete
        </Button>
      </div>
    </form>
  )
}

export default CompletedEventForm
