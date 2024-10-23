import { useGetSingleVendor } from '@/hooks/vendorQueries'
import { Navigate, useParams } from 'react-router-dom'
import VendorCard from './VendorCard'
import VendorEventList from './VendorEventList'
import { Divider } from '@nextui-org/react'

function Vendor() {

  // get vendorId from url
  const { vendorId } = useParams<{ vendorId: string }>()

  // Early return if vendorId is undefined
  if (!vendorId) {
    return <Navigate to="/vendors" replace />
  }

  // get single vendor
  const { data, isPending, error } = useGetSingleVendor(vendorId)

  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>


  return (
    <div className="grid gap-10">
      <VendorCard vendor={data.vendor} />
      <div className="grid gap-8">
        <h2 className="text-3xl font-semibold leading-6 text-gray-900">
          Events featuring this vendor
        </h2>
        <Divider />
        <VendorEventList events={data.events} />
      </div>
    </div>
  )
}
export default Vendor

