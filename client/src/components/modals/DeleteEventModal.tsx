// Import modal components
import { DatabaseEvent } from '@/typings/event.types'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal'
import { Button, Input } from '@nextui-org/react'

// Props for DeleteEventModal
type Props = {
  isOpen: boolean
  onClose: () => void
  eventToDelete: DatabaseEvent | undefined
  confirmDelete: string
  setConfirmDelete: (value: string) => void
  isDisabled?: boolean
  modalConfirmDelete: () => void
}

const DeleteEventModal = ({
  isOpen,
  onClose,
  eventToDelete,
  confirmDelete,
  setConfirmDelete,
  modalConfirmDelete,
  isDisabled = true,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className="flex items-center">
        <ModalHeader>
          <h2>
            To delete{' '}
            <span className="capitalize">
              {eventToDelete?.client}{' '}
              {eventToDelete?.partner && `& ${eventToDelete?.partner}`}
            </span>
            , enter DELETE below.
          </h2>
        </ModalHeader>
        <ModalBody>
          <p>
            This will remove the event from the system - vendors associated with
            the event will not be deleted.
          </p>
          <Input
            onChange={(e) => setConfirmDelete(e.target.value)}
            value={confirmDelete}
          ></Input>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={modalConfirmDelete}
            color="danger"
            isDisabled={isDisabled}
          >
            Delete Event
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteEventModal
