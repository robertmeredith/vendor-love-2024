import { SectionHeading } from '@/components'
import { useGetUserEvents } from '@/hooks/eventQueries'
import { EventTable } from '@/components'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import {
  type DatabaseEvent,
} from '@/typings/event.types'

import { useDeleteEvent } from '@/hooks/eventMutations'
import { DeleteEventModal } from '@/components'


function Events() {
  const { data } = useGetUserEvents()
  const navigate = useNavigate()

  // delete event mutation
  const { mutate: deleteEvent } = useDeleteEvent()

  // State to filter events
  const [searchValue, setSearchValue] = useState<string>('')

  // State to deal with modal and deleting event
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [eventToDelete, setEventToDelete] = useState<DatabaseEvent | undefined>(
    undefined
  )
  // type 'DELETE' to confirm deletion
  const [confirmDelete, setConfirmDelete] = useState<string>('')

  console.log('EVENT TO DELETE ', eventToDelete)
  console.log('CONFIRM DELETE ', confirmDelete)

  // useEffect to open modal if eventToDelete is set
  useEffect(() => {
    if (eventToDelete) {
      setModalIsOpen(true)
    } else {
      setModalIsOpen(false)
    }
  }, [eventToDelete])

  // function to cancel delete
  const cancelDelete = () => {
    setModalIsOpen(false)
    setEventToDelete(undefined)
    setConfirmDelete('')
  }

  // function to delete event
  const modalConfirmDeleteEvent = () => {
    if (confirmDelete === 'DELETE' && eventToDelete) {
      deleteEvent(eventToDelete._id)
      setEventToDelete(undefined)
      setConfirmDelete('')
    }
  }

  // Filter Events sorted by eventDate
  const filteredEvents = data?.events.filter(
    (event: DatabaseEvent) =>
      event.client.toLowerCase().includes(searchValue.toLowerCase()) ||
      event.partner.toLowerCase().includes(searchValue.toLowerCase())
  ).sort((a, b) => b.eventDate.localeCompare(a.eventDate))

  console.log('FILTERED EVENTS ', filteredEvents)

  return (
    <>
      <SectionHeading
        heading="Events"
        text="View and manage your form submissions"
      />
      <div className="flex gap-4 mb-10">
        {/* FILTER EVENTS INPUT */}
        <Input
          className="max-w-xs min-w-60"
          placeholder="Filter Events"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {/* ADD NEW EVENT BUTTON */}
        <Button
          className="min-w-max"
          color="secondary"
          variant="flat"
          onClick={() => navigate('/dashboard/events/new')}
        >
          Add New Event
        </Button>
      </div>

      {/* EVENTS TABLE */}
      {data && (
        <EventTable
          events={filteredEvents || []}
          setEventToDelete={setEventToDelete}
        />
      )}
      <DeleteEventModal
        isOpen={modalIsOpen}
        onClose={cancelDelete}
        eventToDelete={eventToDelete}
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
        modalConfirmDelete={modalConfirmDeleteEvent}
        isDisabled={confirmDelete !== 'DELETE'}
      />
    </>
  )
}
export default Events


// TODO: delete this
// type DeleteEventModalProps = {
//   isOpen: boolean
//   onClose: () => void
//   eventToDelete: DatabaseEvent
//   confirmDelete: string
//   setConfirmDelete: (value: string) => void
//   isDisabled?: boolean
//   modalConfirmDelete: () => void
// }

// const DeleteEventModal = ({
//   isOpen,
//   onClose,
//   eventToDelete,
//   confirmDelete,
//   setConfirmDelete,
//   modalConfirmDelete,
//   isDisabled = true,
// }: DeleteEventModalProps) => {
//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalContent className="flex items-center">
//         <ModalHeader>
//           <h2>
//             To delete{' '}
//             <span className="capitalize">
//               {eventToDelete?.client}{' '}
//               {eventToDelete?.partner && `& ${eventToDelete?.partner}`}
//             </span>
//             , enter DELETE below.
//           </h2>
//         </ModalHeader>
//         <ModalBody>
//           <p>
//             This will remove the event from the system - vendors associated with
//             the event will not be deleted.
//           </p>
//           <Input
//             onChange={(e) => setConfirmDelete(e.target.value)}
//             value={confirmDelete}
//           ></Input>
//         </ModalBody>
//         <ModalFooter>
//           <Button
//             onClick={modalConfirmDelete}
//             color="danger"
//             isDisabled={isDisabled}
//           >
//             Delete Event
//           </Button>
//           <Button onClick={onClose}>Cancel</Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   )
// }
