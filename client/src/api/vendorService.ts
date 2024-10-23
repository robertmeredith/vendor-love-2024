import { customAxios } from './customAxios'
const API_URL_VENDORS = '/vendors'
const API_URL_USER = '/user'

import {
  VendorQueryResult,
  type VendorListQueryResult,
} from '@/typings/vendor.types'

import { VendorFormData } from '@/utils/zod.validation'
import { AxiosError } from 'axios'

// GET FILTERED VENDORS - get logged in users vendors filtered by page etc
const getFilteredUserVendors = async (
  page?: number
): Promise<VendorListQueryResult> => {
  const { data } = await customAxios.get<VendorListQueryResult>(
    `${API_URL_USER}/vendors`,
    {
      params: { page },
    }
  )
  return data
}

// GET ALL USER VENDORS - get all logged in user vendors - PRIVATE
const getAllUserVendors = async (): Promise<VendorListQueryResult> => {
  const { data } = await customAxios.get<VendorListQueryResult>(
    `${API_URL_USER}/vendors/all`
  )
  return data
}

// GET SINGLE VENDOR
const getSingleVendor = async (
  vendorId: string
): Promise<VendorQueryResult> => {
  const { data } = await customAxios.get<VendorQueryResult>(
    `${API_URL_VENDORS}/${vendorId}`
  )
  return data
}

// CREATE NEW VENDOR
const createVendor = async (
  vendorData: VendorFormData
): Promise<VendorQueryResult> => {
  const { data } = await customAxios.post<VendorQueryResult>(
    `${API_URL_VENDORS}`,
    vendorData
  )

  return data
}

// UPDATE VENDOR
const updateVendor = async (
  vendorData: VendorFormData
): Promise<VendorQueryResult | AxiosError> => {
  const { data } = await customAxios.put<VendorQueryResult>(
    `${API_URL_VENDORS}/${vendorData._id}`,
    vendorData
  )
  return data
}

// DELETE VENDOR - delete vendor by id
const deleteVendor = async (
  vendorId: string
): Promise<{ msg: string } | AxiosError> => {
  const { data } = await customAxios.delete<{ msg: string }>(
    `${API_URL_VENDORS}/${vendorId}`
  )
  return data
}

export default {
  getSingleVendor,
  getFilteredUserVendors,
  getAllUserVendors,
  createVendor,
  updateVendor,
  deleteVendor,
}
