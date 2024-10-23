import { useQuery, UseQueryResult } from '@tanstack/react-query'
import eventService from '@/api/eventService'
import {
  type EventListQueryResult,
  type EventQueryResult,
} from '@/typings/event.types'

import { type AxiosError } from 'axios'
import { useLoggedInData } from '@/auth/AuthContext'

// Get all events for logged in user
export const useGetUserEvents = (): UseQueryResult<EventListQueryResult> => {
  const { userToken } = useLoggedInData()

  // const fallback: EventListQueryResult = { count: 0, events: [] }

  const query = useQuery<EventListQueryResult>({
    queryKey: ['events'],
    queryFn: () => eventService.getUserEvents(),
    enabled: !!userToken,
  })

  return query
}

// GET SINGLE EVENT HOOK
export const useGetSingleEvent = (
  eventId: string
): UseQueryResult<EventQueryResult> => {
  // Get user token
  const { userToken } = useLoggedInData()

  // GET SINGLE VENDOR
  const query = useQuery<EventQueryResult, AxiosError>({
    queryKey: ['events', eventId],
    queryFn: () => eventService.getSingleEvent(eventId),
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: !!userToken,
  })

  return query
}
