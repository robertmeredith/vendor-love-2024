import { Card, CardHeader, CardBody, CardFooter, Divider, Button } from '@nextui-org/react'
import { SectionHeading } from '@/components'

import { CalendarDays, CircleUserRound, PlusIcon } from 'lucide-react'
import { useGetUserEvents } from '@/hooks/eventQueries'
import { useGetAllUserVendors } from '@/hooks/vendorQueries'
import { useNavigate } from 'react-router-dom'

function Summary() {
  const navigate = useNavigate()

  // get events
  const { data: events } = useGetUserEvents()

  // get vendors
  const { data: vendors } = useGetAllUserVendors()

  console.log('VENDORS ', vendors);

  return (
    <>
      <SectionHeading
        heading={'Summary'}
        text={'An overview of your submissions'}
      />
      <div className="flex md:flex-row flex-col gap-4">
        <Card className="flex-1 p-1">
          <CardHeader className="flex flex-row items-center gap-2 text-2xl">
            <CalendarDays />
            Events
            <Button variant="light" className="ml-auto" onClick={() => navigate('/dashboard/events')}>View Events</Button>
          </CardHeader>
          <Divider className="w-11/12 mx-auto" />
          <CardBody className="flex flex-col gap-2">
            <p>Number of events:</p>
            <p className="text-2xl font-bold">{events?.count}</p>
          </CardBody>
          <Divider className="w-11/12 mx-auto" />
          <CardFooter className="flex gap-2">
            <Button variant="light" className="ml-auto" color="primary" onClick={() => navigate('/dashboard/events/new')}>Add Event</Button>
          </CardFooter>
        </Card>
        {/* Vendors */}
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center gap-2 text-2xl">
            <CircleUserRound />
            Vendors
            <Button variant="light" className="ml-auto" onClick={() => navigate('/dashboard/vendors')}>View Vendors</Button>
          </CardHeader>
          <Divider className="w-11/12 mx-auto" />
          <CardBody className="flex flex-col gap-2">
            <p>Number of vendors:</p>
            <p className="text-2xl font-bold">{vendors?.count}</p>
          </CardBody>
          <Divider className="w-11/12 mx-auto" />
          <CardFooter className="flex flex-row justify-between">
            <Button variant="light" color="primary" className="ml-auto" onClick={() => navigate('/dashboard/vendors/new')}>Add a vendor</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
export default Summary
