import {
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type Props = {
  label?: string
  error?: string
  description?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const IndentedInput = ({ label, error, description, ...rest }: Props) => {

  return (
    <FormItem>
      <div className="relative">
        {label && (
          <FormLabel className="absolute capitalize -top-2 left-2 inline-block bg-white px-1 text-xs font-medium z-2">
            {label}
          </FormLabel>
        )}
        <FormControl>
          <Input {...rest} />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        {error && <FormMessage>{error}</FormMessage>}
      </div>
    </FormItem>
  )
}

export default IndentedInput
