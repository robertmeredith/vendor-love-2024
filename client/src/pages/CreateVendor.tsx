import { CreateVendorForm, SectionHeading } from '@/components'

function CreateVendor() {
  return (
    <>
      <SectionHeading
        heading={'Create Vendor'}
        text={'Add a new vendor to your records'}
      />
      <CreateVendorForm />
    </>
  )
}
export default CreateVendor
