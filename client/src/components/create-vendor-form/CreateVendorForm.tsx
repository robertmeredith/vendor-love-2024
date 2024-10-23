import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { Textarea, Button } from '@nextui-org/react'
import { ToastAction } from '@/components/ui/toast'

import NextInput from '@/components/forms/NextUi/NextInput'

// Validation
import { zodResolver } from '@hookform/resolvers/zod'
import { VendorFormSchema, type VendorFormData } from '@/utils/zod.validation'
import { formatUrl, formatInstagramUsername } from '@/helpers'

// Mutation
import { useCreateVendor } from '@/hooks/vendorMutations'
import { toast } from '../ui/use-toast'
import { useNavigate } from 'react-router-dom'

const defaultValues: VendorFormData = {
  name: '',
  instagram: '',
  email: '',
  website: '',
  notes: '',
}

function CreateVendorForm() {
  // Mutation to create vendor
  const { mutate: createVendor } = useCreateVendor()

  // Navigation
  const navigate = useNavigate()

  // Creat form using react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VendorFormData>({
    defaultValues,
    resolver: zodResolver(VendorFormSchema),
  })

  // Form Submit Handler
  const onSubmit: SubmitHandler<VendorFormData> = (data) => {
    createVendor(data, {
      onSuccess: () => {
        toast({
          title: 'Vendor created',
          description: 'Vendor has been created',
          action: (
            <ToastAction
              altText="Vendor List"
              onClick={() => {
                navigate('/dashboard/vendors')
              }}
            >
              Vendor List
            </ToastAction>
          ),
        })
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <NextInput
                label="Vendor Name"
                {...field}
                isInvalid={!!errors?.name?.message}
                errorMessage={errors?.name?.message}
                isRequired={true}
              />
            )}
          />
          <Controller
            name="instagram"
            control={control}
            render={({ field }) => (
              <NextInput
                {...field}
                label="Instagram"
                startContent="@"
                isInvalid={!!errors?.instagram?.message}
                errorMessage={errors?.instagram?.message}
                onBlur={() => {
                  // format Instagram input to just be the username
                  field.onChange(formatInstagramUsername(field.value || ''))
                }}
              />
            )}
          />
          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <NextInput
                {...field}
                label="Website"
                startContent="www."
                isInvalid={!!errors?.website?.message}
                errorMessage={errors?.website?.message}
                onBlur={() => {
                  // format URL input to just be the website without https://www.
                  field.onChange(formatUrl(field.value || ''))
                }}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <NextInput
                {...field}
                label="Email"
                isInvalid={!!errors?.email?.message}
                errorMessage={errors?.email?.message}
              />
            )}
          />
        </div>
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              label="Vendor Notes"
              placeholder="Useful information about this vendor"
              description="These notes will only be visible to you"
            />
          )}
        />
        <div className="flex gap-4 justify-end">
          <Button type="submit" color="success">
            Submit
          </Button>
        </div>
      </div>
    </form>
  )
}

export default CreateVendorForm
