import { forwardRef } from 'react'

import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { ControllerRenderProps } from 'react-hook-form'

type Props = {
  options: string[]
  label?: string
  isReadOnly?: boolean
  errorMessage?: string
  isInvalid?: boolean
  labelPlacement?: 'inside' | 'outside' | 'outside-left'
} & Omit<ControllerRenderProps, 'ref'>

const NextAutoComplete = forwardRef<HTMLInputElement, Props>(
  (
    {
      options,
      label,
      labelPlacement = 'inside',
      isReadOnly = false,
      errorMessage = false,
      isInvalid,
      ...field
    },
    ref
  ) => {
    // create iterable from options
    const iterable = options.map((option) => ({ _id: option, name: option }))

    return (
      <Autocomplete
        ref={ref}
        inputProps={{
          classNames: {
            input: 'capitalize',
          },
        }}
        {...field}
        isReadOnly={isReadOnly}
        size={'md'}
        label={label || field.name}
        defaultItems={iterable}
        onSelectionChange={field.onChange}
        onInputChange={field.onChange}
        menuTrigger="focus"
        // inputValue={field.value}
        defaultInputValue={field.value}
        defaultSelectedKey={field.value}
        // selectedKey={field.value}
        errorMessage={errorMessage}
        isInvalid={isInvalid}
        labelPlacement={labelPlacement}
      >
        {(item) => (
          <AutocompleteItem key={item._id} className="capitalize">
            {item.name}
          </AutocompleteItem>
        )}
      </Autocomplete>
    )
  }
)

NextAutoComplete.displayName = 'NextAutoComplete'

export default NextAutoComplete
