import { DatabaseEvent } from '@/typings/event.types'
import { useNavigate } from 'react-router-dom'

// date formatter
import { formatEventDate } from '@/helpers'

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
    key: 'client',
    label: 'NAME',
  },
  {
    key: 'partner',
    label: 'PARTNER',
  },
  {
    key: 'email',
    label: 'EMAIL',
  },
  {
    key: 'eventDate',
    label: 'EVENT DATE',
  },
  {
    key: 'vendors',
    label: 'VENDORS',
  },
  {
    key: 'actions',
    label: 'ACTIONS',
  },
]

type Props = {
  events: DatabaseEvent[]
  setEventToDelete?: (event: DatabaseEvent) => void | undefined
}

export default function EventTable({ events, setEventToDelete }: Props) {
  const navigate = useNavigate()

  return (
    <ScrollShadow className="max-h-[500px]">
      <Table
        aria-label="Table listing all user vendor records"
        removeWrapper
        // isStriped
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
        <TableBody items={events} emptyContent={'No events to display.'}>
          {(item) => (
            <TableRow
              key={item._id}
              className="border-b border-grey-300 h-14 rounded-lg hover:bg-gray-50"
            >
              {(columnKey) => {
                if (columnKey === 'actions') {
                  return (
                    <TableCell>
                      <div className="relative flex items-center gap-2 justify-center">
                        <Tooltip content="Details">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() => {
                              console.log('CLICK')
                              navigate(`/dashboard/events/${item._id}`)
                            }}
                          >
                            <EyeIcon />
                          </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete Event">
                          <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            {setEventToDelete && (
                              <TrashIcon
                                onClick={() => setEventToDelete(item)}
                              />
                            )}
                          </span>
                        </Tooltip>
                      </div>
                    </TableCell>
                  )
                }
                if (columnKey === 'vendors') {
                  return <TableCell>{item.vendors.length}</TableCell>
                }
                if (columnKey === 'eventDate') {
                  return (
                    <TableCell>{formatEventDate(item.eventDate)}</TableCell>
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
