import { Select, SelectItem } from '@nextui-org/react'
import { defaultVendorCategories } from '@/helpers'

console.log(defaultVendorCategories)

// makearray matching defaultVendorCategories size
const vendorRows = Array.from(
  { length: defaultVendorCategories.length },
  (_, i) => i
)

function SelectTest() {
  return (
    <div className="flex flex-col">
      <div>
        {vendorRows.map((_, index) => {
          return (
            <Select
              size="md"
              label="Category"
              defaultSelectedKeys={[defaultVendorCategories[index]]}
            >
              {defaultVendorCategories.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </Select>
          )
        })}
      </div>
    </div>
  )
}
export default SelectTest
