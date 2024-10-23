import { forwardRef } from 'react'
import { Input } from '@nextui-org/input'
import { ControllerRenderProps } from 'react-hook-form'

type Props = {
  label?: string
  placeholder?: string
  startContent?: string
  endContent?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  readOnly?: boolean
  isRequired?: boolean
  isInvalid?: boolean
  errorMessage?: string
  labelPlacement?: 'inside' | 'outside' | 'outside-left'
} & Omit<ControllerRenderProps, 'ref'>

const NextInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      placeholder,
      startContent,
      size = 'md',
      readOnly = false,
      isRequired = false,
      isInvalid = false,
      labelPlacement = 'inside',
      errorMessage,
      ...field
    },
    ref
  ) => {
    return (
      <Input
        readOnly={readOnly}
        ref={ref}
        label={label}
        size={size}
        placeholder={placeholder}
        labelPlacement={labelPlacement}
        isRequired={isRequired}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        {...field}
        startContent={
          startContent && (
            <span className="text-default-400 text-small">{startContent}</span>
          )
        }
      />
    )
  }
)

NextInput.displayName = 'NextInput'

export default NextInput
