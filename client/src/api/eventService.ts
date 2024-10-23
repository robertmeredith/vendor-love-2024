import { customAxios } from './customAxios'
import {
  SubmittedEventFormData,
  UpdatedEventFormData,
  type EventListQueryResult,
  type EventQueryResult,
} from '@/typings/event.types'

const API_URL_EVENTS = '/events'
const API_URL_USER = '/user'

// GET - all events for user
const getUserEvents = async (): Promise<EventListQueryResult> => {
  const { data } = await customAxios.get(`${API_URL_USER}/events`)
  return data
}

// GET - single event
const getSingleEvent = async (eventId: string): Promise<EventQueryResult> => {
  const { data } = await customAxios.get(`${API_URL_EVENTS}/${eventId}`)
  return data
}

// POST - create event
const createEvent = async (
  formData: SubmittedEventFormData
): Promise<EventQueryResult> => {
  const { data } = await customAxios.post(API_URL_EVENTS, formData)

  return data
}

// PUT - update event
const updateEvent = async (
  formData: UpdatedEventFormData
): Promise<EventQueryResult> => {
  const { data } = await customAxios.put(
    `${API_URL_EVENTS}/${formData._id}`,
    formData
  )
  return data
}

// DELETE - delete event
const deleteEvent = async (eventId: string): Promise<{ msg: string }> => {
  const { data } = await customAxios.delete(`${API_URL_EVENTS}/${eventId}`)
  return data
}

export default {
  getUserEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
  deleteEvent,
}
