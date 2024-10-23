import EventTable from '../event-list/EventTable'
import { DatabaseEvent } from '@/typings/event.types'

type Props = {
  events: DatabaseEvent[]
}

function VendorEventList({ events }: Props) {
  // TODO: Add delete event functionality
  return <EventTable events={events} />
}
export default VendorEventList
