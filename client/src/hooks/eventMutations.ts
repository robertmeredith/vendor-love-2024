import eventService from '@/api/eventService'
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'
import {
  EventQueryResult,
  SubmittedEventFormData,
  UpdatedEventFormData,
} from '@/typings/event.types'
import { AxiosError } from 'axios'

// CREATE EVENT
export const useCreateEvent = (): UseMutationResult<
  EventQueryResult,
  AxiosError,
  SubmittedEventFormData
> => {
  // Initialise queryClient to clear queries on success
  const queryClient = useQueryClient()
  // Initialise navigate to redirect on sucess
  const navigate = useNavigate()

  const mutation = useMutation<
    EventQueryResult,
    AxiosError,
    SubmittedEventFormData
  >({
    mutationFn: (formData: SubmittedEventFormData) =>
      eventService.createEvent(formData),
    onSuccess: () => {
      // Refetch all queries related to events
      queryClient.invalidateQueries({ queryKey: ['events'] })
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      navigate('/dashboard/events')
      toast({
        title: 'Success!',
        description: 'New event added',
      })
    },
    onError: (error) => {
      console.log('ERROR - CREATE EVENT ', error)
      toast({
        title: 'Error!',
        description: 'Failed to create event',
      })
    },
  })

  return mutation
}

// UPDATE EVENT
export const useUpdateEvent = (): UseMutationResult<
  EventQueryResult,
  AxiosError,
  UpdatedEventFormData
> => {
  // Initialise queryClient to clear queries on success
  const queryClient = useQueryClient()

  const mutation = useMutation<
    EventQueryResult,
    AxiosError,
    UpdatedEventFormData
  >({
    mutationFn: (formData: UpdatedEventFormData) =>
      eventService.updateEvent(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      toast({
        title: 'Success!',
        description: 'Event updated',
      })
    },
    onError: (error: AxiosError) => {
      console.log('ERROR - UPDATE EVENT ', error)
      toast({
        title: 'Error!',
        description: 'Failed to update event',
      })
    },
  })

  return mutation
}

// DELETE EVENT
export const useDeleteEvent = (): UseMutationResult<
  { msg: string },
  AxiosError,
  string
> => {
  // Initialise queryClient to clear queries on success
  const queryClient = useQueryClient()
  // Initialise navigate to redirect on sucess
  const navigate = useNavigate()

  const mutation = useMutation<{ msg: string }, AxiosError, string>({
    mutationFn: (eventId: string) => eventService.deleteEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      queryClient.invalidateQueries({ queryKey: ['events'] })
      navigate('/dashboard/events')
      toast({
        title: 'Success!',
        description: 'Event deleted',
      })
    },
    onError: (error: AxiosError) => {
      console.log('ERROR - DELETE EVENT ', error)
      toast({
        title: 'Error!',
        description: 'Failed to delete event',
      })
    },
  })

  return mutation
}
