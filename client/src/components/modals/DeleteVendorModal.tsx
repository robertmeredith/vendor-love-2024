// Import modal components
import { VendorPrivate } from '@/typings/vendor.types'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal'
import { Button, Input } from '@nextui-org/react'

type Props = {
  isOpen: boolean
  onClose: () => void
  vendorToDelete: VendorPrivate
  confirmDelete: string
  setConfirmDelete: (value: string) => void
  isDisabled?: boolean
  modalConfirmDelete: () => void
}

const DeleteVendorModal = ({
  isOpen,
  onClose,
  vendorToDelete,
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
            To delete <span className="capitalize">{vendorToDelete?.name}</span>{' '}
            enter DELETE below.
          </h2>
        </ModalHeader>
        <ModalBody>
          <p>
            This will remove the vendor and the record of them in any events
            from the system
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
            Delete Vendor
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteVendorModal
