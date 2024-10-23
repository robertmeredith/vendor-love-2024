import { Input } from '@nextui-org/input'
import { ControllerRenderProps } from 'react-hook-form'

type Props = {
  label?: string
  placeholder?: string
  startContent?: string
  size?: 'sm' | 'md' | 'lg'
} & ControllerRenderProps

function NextInput({
  label,
  placeholder,
  startContent,
  size = 'md',
  ...field
}: Props) {

  return (
    <Input
      label={label}
      size={size}
      placeholder={placeholder}
      labelPlacement="inside"
      {...field}
      startContent={
        <span className="text-default-400 text-small">{startContent}</span>
      }
    />
  )
}
export default NextInput
