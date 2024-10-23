import { SectionHeading } from '@/components'
import { UserEventForm } from '@/components'

function EventForm() {
  return (
    <>
      <SectionHeading
        heading="Event form"
        text="Manually add details of an event to your database"
      />

      <UserEventForm />
    </>
  )
}
export default EventForm
