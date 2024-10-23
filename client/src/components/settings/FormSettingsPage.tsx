import { Button, Chip, Input, Switch } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { toast } from '../ui/use-toast'
// import react hook form
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { SettingsFormData } from '@/typings/settings.types'
import { useUpdateSettings } from '@/hooks/settingsMutations'

// Import Icons
import { Plus, Check } from 'lucide-react'

function FormSettingsPage({
  settings,
  defaultCategories,
}: {
  settings: SettingsFormData
  defaultCategories: string[]
}) {
  const { mutate: updateSettings, isSuccess } = useUpdateSettings()

  const {
    watch,
    getValues,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm<SettingsFormData>({
    defaultValues: settings,
  })

  // Effect to reset form state after successful save
  useEffect(() => {
    if (isSuccess) {
      reset(getValues())
    }
  }, [isSuccess, reset, getValues])

  // watch form
  const userCategories = watch('categories')

  // set custom category to add to user categories
  const [customCategory, setCustomCategory] = useState<string>('')

  // REMOVE CATEGORY - from user categories
  const removeCategory = (category: string) => {
    const currentCategories = getValues('categories')

    setValue(
      'categories',
      currentCategories.filter((c) => c !== category),
      {
        shouldDirty: true,
      }
    )
  }

  // ADD DEFAULT CATEGORY - to user categories
  const addDefaultCategoryToUserCategories = (category: string) => {
    const currentCategories = getValues('categories')

    // check if category is already in user categories
    if (currentCategories.includes(category)) {
      return
    }
    setValue('categories', [...currentCategories, category], {
      shouldDirty: true,
    })
  }

  // ADD CUSTOM CATEGORY - to user categories
  const addCustomCategory = () => {
    const currentCategories = getValues('categories')

    // handle comma separated categories - split by comma, trim whitespace, and filter out empty strings
    const newCategories = customCategory
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c !== '')

    console.log('New categories', newCategories)

    const addedCategories: string[] = []
    const duplicateCategories: string[] = []

    newCategories.forEach((category) => {
      if (
        !currentCategories.some(
          (c) => c.toLowerCase() === category.toLowerCase()
        )
      ) {
        addedCategories.push(category)
      } else {
        duplicateCategories.push(category)
      }
    })

    if (addedCategories.length > 0) {
      setValue('categories', [...currentCategories, ...addedCategories], {
        shouldDirty: true,
      })
    }

    // Show appropriate toast messages
    if (duplicateCategories.length > 0) {
      toast({
        title:
          duplicateCategories.length === 1
            ? `"${duplicateCategories[0]}" already exists in your list`
            : `Some categories already exist in your list`,
        description:
          duplicateCategories.length === 1
            ? 'Please enter a unique category'
            : `${duplicateCategories.join(', ')} were not added`,
      })
    }
    setCustomCategory('')
  }

  // Filter Default Vendor Types by excluding vendors already in the users list
  const filteredDefaultCategories = defaultCategories.filter((category) => {
    const currentCategories = getValues('categories') || []
    return !currentCategories.includes(category)
  })

  // SUBMIT HANDLER
  const onSubmit: SubmitHandler<SettingsFormData> = (data) => {
    // use useUpdateSettings mutation to update the settings
    updateSettings(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-8 flex-col">
        <Controller
          control={control}
          name={'business.includeOnForm'}
          render={({ field }) => (
            <Switch
              size="sm"
              color="secondary"
              isSelected={field.value}
              onChange={field.onChange}
            >
              Include Business Details on Form
            </Switch>
          )}
        />

        <div className="mt-2 sm:col-span-2 sm:mt-0">
          <div className="w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  min-h-[6rem] break-normal p-1.5">
            {userCategories.map((category) => {
              return (
                <Chip
                  key={category}
                  size="sm"
                  color="secondary"
                  // variant="bordered"
                  className="mr-1.5 mb-1.5 px-2 gap-1"
                  onClose={() => {
                    removeCategory(category)
                  }}
                >
                  {category}
                </Chip>
              )
            })}
          </div>

          {/* BOX CONTAINING DEFAULT CATEGORIES */}
          <div className="mt-4">
            <h3>Default Vendor Categories</h3>
            <p className="mt-3 text-sm leading-6 text-gray-600 max-w-2xl ">
              Select vendor categories to include on your event form from the
              default list below and/or add your own
            </p>
          </div>
          <div className="w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  min-h-[6rem] break-normal p-1.5 mt-3">
            {filteredDefaultCategories.map((category) => {
              return (
                <Chip
                  key={category}
                  startContent={
                    // show Plus, but on hover show Check
                    <div
                      className="cursor-pointer h-3.5 w-3.5  bg-white rounded-full mr-1 flex items-center justify-center group p-0.5"
                      onClick={() =>
                        addDefaultCategoryToUserCategories(category)
                      }
                    >
                      <Plus className="group-hover:hidden"/>
                      <Check className="hidden group-hover:block" />
                    </div>
                  }
                  size="sm"
                  color="secondary"
                  variant="flat"
                  className="mr-1.5 mb-1.5 px-2"
                >
                  {category}
                </Chip>
              )
            })}
          </div>
          <div className="my-6  flex gap-4 items-center">
            <Input
              className="w-full"
              type="text"
              name="vendor-type"
              id="vendor-type"
              value={customCategory}
              autoComplete="off"
              onChange={(e) => setCustomCategory(e.target.value)}
            />
            <Button
              className="w-full md:w-32"
              variant="ghost"
              isDisabled={customCategory === ''}
              type="button"
              onClick={addCustomCategory}
              // disable if values have not changed
            >
              Add Category
            </Button>
          </div>
          <Button
            className="w-full md:w-32"
            variant="ghost"
            color="primary"
            // disable if values have not changed
            isDisabled={!isDirty}
            type="submit"
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  )
}
export default FormSettingsPage
