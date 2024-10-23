import { forwardRef } from 'react'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { type ControllerRenderProps } from 'react-hook-form'

type Props = {
  options: string[]
  placeholder?: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
} & Omit<ControllerRenderProps, 'ref'>

const NextSelect = forwardRef<HTMLInputElement, Props>(
  ({ label, options, size = 'md', placeholder, disabled, ...field }, ref) => {
    return (
      <Autocomplete
        isReadOnly={disabled}
        ref={ref}
        label={label}
        placeholder={placeholder}
        className="max-w-xs"
        defaultInputValue={field.value}
        {...field}
      >
        {options.map((option) => (
          <AutocompleteItem key={option}>{option}</AutocompleteItem>
        ))}
      </Autocomplete>
    )
  }
)

NextSelect.displayName = 'NextSelect'

export default NextSelect
