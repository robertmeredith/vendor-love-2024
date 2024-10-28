import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from '@nextui-org/react'
import { SectionHeading } from '@/components'

import { CalendarDays, CircleUserRound } from 'lucide-react'
import { useGetUserEvents } from '@/hooks/eventQueries'
import { useGetAllUserVendors } from '@/hooks/vendorQueries'
import { Link, useNavigate } from 'react-router-dom'

function Summary() {
  const navigate = useNavigate()

  // get events
  const { data: events } = useGetUserEvents()

  // get vendors
  const { data: vendors } = useGetAllUserVendors()

  console.log('VENDORS ', vendors)

  return (
    <>
      <SectionHeading
        heading={'Summary'}
        text={'An overview of your submissions'}
      />
      <div className="flex md:flex-row flex-col gap-4">
        <Card className="flex-1 p-1">
          <CardHeader className="py-4">
            <Link
              to="/dashboard/events"
              className="flex flex-row items-center gap-2 text-2xl font-semibold pl-3"
            >
              <CalendarDays />
              Events
            </Link>
          </CardHeader>
          <Divider className="w-11/12 mx-auto" />
          <CardBody className="flex flex-col gap-2 mx-3">
            <p className="text-foreground/70">Number of events:</p>
            <Link to="/dashboard/events" className="max-w-max">
              <p className="text-2xl font-bold">{events?.count}</p>
            </Link>
          </CardBody>
          <Divider className="w-11/12 mx-auto" />
          <CardFooter className="flex gap-2">
            <Button
              variant="light"
              className="ml-auto"
              color="primary"
              onClick={() => navigate('/dashboard/events/new')}
            >
              Add Event
            </Button>
          </CardFooter>
        </Card>
        {/* Vendors */}
        <Card className="flex-1">
          <CardHeader className="py-4">
            <Link
              to="/dashboard/vendors"
              className="flex flex-row items-center gap-2 text-2xl font-semibold pl-3"
            >
              <CircleUserRound />
              Vendors
            </Link>
          </CardHeader>
          <Divider className="w-11/12 mx-auto" />
          <CardBody className="flex flex-col gap-2 mx-3">
            <p className="text-foreground/70">Number of vendors:</p>
            <Link to="/dashboard/vendors" className="max-w-max">
              <h1 className="text-2xl font-bold">{vendors?.count}</h1>
            </Link>
          </CardBody>
          <Divider className="w-11/12 mx-auto" />
          <CardFooter className="flex flex-row justify-between">
            <Button
              variant="light"
              color="primary"
              className="ml-auto"
              onClick={() => navigate('/dashboard/vendors/new')}
            >
              Add Vendor
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
export default Summary
