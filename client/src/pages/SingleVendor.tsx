import { SectionHeading } from '@/components'
import { Vendor } from '@/components'

function SingleVendor() {


  return (
    <>
      <SectionHeading
        heading={'Vendor Details'}
        text={'View and manage your vendor'}
      />
      <Vendor />
    </>
  )
}
export default SingleVendor
