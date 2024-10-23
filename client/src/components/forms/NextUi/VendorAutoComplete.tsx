import { forwardRef } from 'react'
import { Vendor } from '../types'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { ControllerRenderProps } from 'react-hook-form'

type Props = {
  options: Vendor[]
  label: string
  isReadOnly?: boolean
  handleSelectionChange: (_id: string) => void
} & Omit<ControllerRenderProps, 'ref'>

const VendorAutoComplete = forwardRef<HTMLInputElement, Props>(
  ({ options, label, handleSelectionChange, isReadOnly, ...field }, ref) => {
    return (
      <Autocomplete
        ref={ref}
        inputProps={{
          classNames: {
            input: 'capitalize',
          },
        }}
        // TODO: when clearing it should clear the whole row
        classNames={
          {
            // clearButton: 'hidden',
          }
        }
        isReadOnly={isReadOnly}
        allowsCustomValue
        label={label || field.name}
        defaultItems={options}
        onSelectionChange={(key) => handleSelectionChange(String(key))}
        onInputChange={field.onChange}
        menuTrigger="input"
        defaultInputValue={field.value}
        {...field}
        selectorIcon={null}
      >
        {(item) => (
          <AutocompleteItem key={item._id} className="capitalize">
            {item.name}
            {/*TODO: When implementing the below, below additional details, select a value doesn't work properly */}
            {/* <span className="text-tiny text-default-400">Email</span> */}
          </AutocompleteItem>
        )}
      </Autocomplete>
    )
  }
)

VendorAutoComplete.displayName = 'VendorAutoComplete'

export default VendorAutoComplete
