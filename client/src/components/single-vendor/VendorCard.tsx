import { VendorPrivate } from '@/typings/vendor.types'
import { useState } from 'react'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import NextInput from '@/components/forms/NextUi/NextInput'
import { Textarea, Button } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

type VendorCardProps = {
  vendor: VendorPrivate
}

function VendorCard({ vendor }: VendorCardProps) {
  // State to handle edit/save button
  const [disabled, setDisabled] = useState(true)

  const navigate = useNavigate()

  // Form handling
  const { control, handleSubmit, reset } = useForm({
    defaultValues: vendor,
  })

  // Submit handler
  const onSubmit: SubmitHandler<VendorPrivate> = (data) => {
    console.log(data)
  }

  // Reset form back to original values
  const revertChanges = () => {
    setDisabled(true)
    reset(vendor)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <NextInput disabled={disabled} label="vendor name" {...field} />
            )}
          />
          <Controller
            name="instagram"
            control={control}
            render={({ field }) => (
              <NextInput
                disabled={disabled}
                {...field}
                label="instagram"
                startContent="@"
              />
            )}
          />
          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <NextInput
                disabled={disabled}
                {...field}
                label="website"
                startContent="www."
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <NextInput disabled={disabled} {...field} label="email" />
            )}
          />
        </div>
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <Textarea
              disabled={disabled}
              {...field}
              label="Vendor Notes"
              placeholder="Enter any useful information about this vendor"
              description="These notes will only be visible to you"
            />
          )}
        />
        <div className="flex gap-4 justify-end">
          {!disabled && (
            <Button
              onClick={revertChanges}
              variant="light"
              type="button"
              color="default"
            >
              Cancel
            </Button>
          )}
          {vendor.isUser ? (
            <Button
              type="button"
              color="primary"
              onClick={() => navigate('/dashboard/settings')}
            >
              Edit in Settings
            </Button>
          ) : (
            <>
              <Button
                onClick={() => setDisabled(!disabled)}
                type={disabled ? 'button' : 'submit'}
                color={disabled ? 'default' : 'success'}
              >
                {disabled ? 'Edit' : 'Save Changes'}
              </Button>
              <Button type="button" color="danger">
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </form>
  )
}
export default VendorCard
