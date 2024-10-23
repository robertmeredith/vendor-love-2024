import { type VendorPrivate } from '@/typings/vendor.types'
import { TableRow, TableCell } from '@nextui-org/react'

type VendorTableRowProps = {
  vendor: VendorPrivate
}

function VendorTableRow({ vendor }: VendorTableRowProps) {
  return (
    <TableRow>
      <TableCell>{vendor.name}</TableCell>
      <TableCell>{vendor.instagram}</TableCell>
      <TableCell>{vendor.website}</TableCell>
      <TableCell>{vendor.email}</TableCell>
    </TableRow>
  )
}

export default VendorTableRow
