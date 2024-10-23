import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { FormElementProps } from './types'

type SelectInputProps = {
  options: string[]
} & FormElementProps

const FormSelect = ({
  label,
  name,
  options,
  defaultValue,
}: SelectInputProps) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Select name={name} defaultValue={defaultValue || options[0]}>
        <SelectTrigger className="capitalize">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            return (
              <SelectItem key={option} value={option} className="capitalize">
                {option}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
export default FormSelect
