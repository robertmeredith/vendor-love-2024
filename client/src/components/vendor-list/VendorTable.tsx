import { type VendorPrivate } from '@/typings/vendor.types'
import { useNavigate } from 'react-router-dom'

import { Eye as EyeIcon, Trash2 as TrashIcon } from 'lucide-react'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Tooltip,
  ScrollShadow,
} from '@nextui-org/react'

const columns = [
  {
    key: 'name',
    label: 'NAME',
  },
  {
    key: 'instagram',
    label: 'INSTAGRAM',
  },
  {
    key: 'website',
    label: 'WEBSITE',
  },
  {
    key: 'email',
    label: 'EMAIL',
  },
  {
    key: 'actions',
    label: 'ACTIONS',
  },
]

type Props = {
  vendors: VendorPrivate[]
  setVendorToDelete: (vendor: VendorPrivate) => void
}

export default function VendorTable({ vendors, setVendorToDelete }: Props) {
  const navigate = useNavigate()

  return (
    <ScrollShadow className="max-h-[500px]">

        <Table
          aria-label="Table listing all user vendor records"
          removeWrapper
          isStriped
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.key}
                align={column.key === 'actions' ? 'center' : 'start'}
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={vendors} emptyContent={'No vendors to display.'}>
            {(item) => (
              <TableRow
                key={item._id}
                className="border-b-1 border-grey-300 h-14"
              >
                {(columnKey) => {
                  // Cell for Name - needs capitalizing
                  if (columnKey === 'name') {
                    return (
                      <TableCell className="capitalize">
                        {getKeyValue(item, columnKey)}
                      </TableCell>
                    )
                  }
                  if (columnKey === 'actions') {
                    return (
                      <TableCell>
                        <div className="relative flex items-center gap-2 justify-center">
                          <Tooltip content="View Vendor Details">
                            <span
                              className="text-lg text-default-400 cursor-pointer active:opacity-50"
                              onClick={() => {
                                console.log('CLICK')
                                navigate(`/dashboard/vendors/${item._id}`)
                              }}
                            >
                              <EyeIcon />
                            </span>
                          </Tooltip>

                          <Tooltip color="danger" content="Delete vendor">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                              {/* <DeleteIcon onClick={() => deleteVendor(item._id)} /> */}
                              {!item.isUser && (
                                <TrashIcon
                                  onClick={() => setVendorToDelete(item)}
                                />
                              )}
                            </span>
                          </Tooltip>
                        </div>
                      </TableCell>
                    )
                  }
                  return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
    </ScrollShadow>
  )
}
