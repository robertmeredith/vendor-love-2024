import { EventFormSkeleton, SectionHeading } from '@/components'
import CompletedEventForm from '@/components/forms/CompletedEventForm'
import { toast } from '@/components/ui/use-toast'
import { useGetSingleEvent } from '@/hooks/eventQueries'
import { Button, Switch } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

function SingleEvent() {
  // get vendorId from url
  const { eventId } = useParams()

  if (!eventId) {
    return <Navigate to="/events" replace />
  }

  const [includeCategory, setIncludeCategory] = useState<boolean>(true)

  // get single vendor
  const { data, isPending, error, refetch } = useGetSingleEvent(eventId)

  // Force refetch when component mounts
  useEffect(() => {
    refetch()
  }, [refetch])

  // Copy for Instagram
  const copyForInstagram = () => {
    // check if data is defined
    if (!data) {
      toast({
        title: 'Error',
        description: 'No event information to copy',
      })
      return
    }
    const instaList = includeCategory
      ? data.event.vendors
          .map(
            (v) =>
              v.vendor.instagram && `${v.category} | @${v.vendor.instagram}`
          )
          .join('\n')
      : data.event.vendors
          .map((v) => v.vendor.instagram && `@${v.vendor.instagram}`)
          .join('\n')
    // map over the vendors and if the vendor has an instagram, return the instagram handle
    navigator.clipboard.writeText(instaList)
    toast({
      title: 'Copied for Instagram',
      description: 'Vendor list copied to clipboard',
    })
  }

  // Copy for Email
  const copyForEmail = () => {
    if (!data) {
      toast({
        title: 'Error',
        description: 'No event information to copy',
      })
      return
    }
    const emailList = data.event.vendors.map((v) => v.vendor.email).join(', ')
    navigator.clipboard.writeText(emailList)
    toast({
      title: 'Copied for Email',
      description: 'Email addresses copied to clipboard',
    })
  }

  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <SectionHeading
        heading={'Event Details'}
        text={'View and manage your client form submission'}
      />
      <div className="flex flex-col md:flex-row gap-4 md:gap-2 mb-10">
        <div className="flex gap-4 w-full">
          <Button
            isDisabled={!data}
            variant="flat"
            color="primary"
            className="w-1/2 md:w-40 "
            onClick={copyForInstagram}
          >
            Copy for Instagram
          </Button>
          <Switch
            isDisabled={!data}
            isSelected={includeCategory}
            size="sm"
            onValueChange={setIncludeCategory}
            className="min-w-max ml-auto md:m-0"
          >
            Include Category
          </Switch>
        </div>
        <Button
          isDisabled={!data}
          variant="flat"
          color="secondary"
          className="w-full md:w-40 ml-auto"
          onClick={copyForEmail}
        >
          Copy for Email
        </Button>
      </div>
      {!data ? (
        <EventFormSkeleton />
      ) : (
        <CompletedEventForm
          event={data?.event}
          key={data.event.updatedAt}
          includeCategory={includeCategory}
        />
      )}
    </>
  )
}
export default SingleEvent
