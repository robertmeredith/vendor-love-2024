import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

type InputWithLabel = {
  label: string
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>


function InputWithLabel({ label, name, error, ...rest }: InputWithLabel) {

  return (
    <div className="grid gap-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Input {...rest} className={`${error ? 'border border-red-300' : ''}`} />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  )
}

export default InputWithLabel
