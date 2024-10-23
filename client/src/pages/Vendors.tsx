import { SectionHeading, VendorTable } from '@/components'
import { Button, Input } from '@nextui-org/react'
import { useGetAllUserVendors } from '@/hooks/vendorQueries'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { type VendorPrivate } from '@/typings/vendor.types'

import { DeleteVendorModal } from '@/components'

// Import delete vendor mutation
import { useDeleteVendor } from '@/hooks/vendorMutations'

function Vendors() {
  // Initialise delete vendor mutation
  const { mutate: deleteVendor } = useDeleteVendor()

  // Local state to filter vendors
  const [searchValue, setSearchValue] = useState<string>('')

  // Local state to deal with modal and deleting vendor
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [vendorToDelete, setVendorToDelete] = useState<
    VendorPrivate | undefined
  >(undefined)
  // type 'DELETE' to confirm deletion
  const [confirmDelete, setConfirmDelete] = useState<string>('')

  // iniialise Navigate to direct to 'Create Vendor'
  const navigate = useNavigate()

  // Open modal if vendor to delete is set
  useEffect(() => {
    if (vendorToDelete) {
      setModalIsOpen(true)
    } else {
      setModalIsOpen(false)
    }
  }, [vendorToDelete])

  
  const { data, isLoading, isError, error } = useGetAllUserVendors()

  const cancelDelete = () => {
    setModalIsOpen(false)
    setVendorToDelete(undefined)
    setConfirmDelete('')
  }

  const modalConfirmDeleteVendor = () => {
    if (confirmDelete === 'DELETE' && vendorToDelete) {
      deleteVendor(vendorToDelete._id)
      setVendorToDelete(undefined)
      setConfirmDelete('')
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  const filteredVendors = data?.vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      vendor.website.toLowerCase().includes(searchValue.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name))


  return (
    <>
      <SectionHeading
        heading={'Vendors'}
        text={'View and manage your vendors'}
      />
      <div className="flex gap-4 mb-10">
        {/* FILTER VENDORS INPUT */}
        <Input
          className="max-w-xs min-w-60"
          placeholder="Filter Vendors"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {/* ADD NEW VENDOR BUTTON */}
        <Button
          className="min-w-max"
          color="secondary"
          variant="flat"
          onClick={() => navigate('/dashboard/vendors/new')}
        >
          Add New Vendor
        </Button>
      </div>

      {/* VENDOR TABLE */}
      <VendorTable
        vendors={filteredVendors ?? []}
        setVendorToDelete={setVendorToDelete}
      />

      {/* Modal */}
      {vendorToDelete && (
      <DeleteVendorModal
        isOpen={modalIsOpen}
        onClose={cancelDelete}
        vendorToDelete={vendorToDelete}
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
        modalConfirmDelete={modalConfirmDeleteVendor}
          isDisabled={confirmDelete !== 'DELETE'}
        />
      )}
    </>
  )
}
export default Vendors
