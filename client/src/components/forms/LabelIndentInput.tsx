import { Control, FieldValues, FieldPath } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type LabelIndentInputProps<T extends FieldValues> = {
  control: Control<T>
  label: string
  name: FieldPath<T>
  type?: string
}

export default function LabelIndentInput<T extends FieldValues>(
  props: LabelIndentInputProps<T>
) {
  const { name, label, control, type = 'text' } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <div className="relative">
            <FormLabel
              htmlFor={name}
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900 z-2"
            >
              {label}
            </FormLabel>
            <FormControl>
              <Input id={name} type={type} {...field} autoComplete="off"/>
            </FormControl>
            {error && <FormMessage className='mt-1'>{error.message}</FormMessage>}
          </div>
        </FormItem>
      )}
    />
  )
}
