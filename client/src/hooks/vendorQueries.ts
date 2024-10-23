import { useQuery, UseQueryResult } from '@tanstack/react-query'
import vendorService from '@/api/vendorService'
import {
  type VendorQueryResult,
  type VendorListQueryResult,
} from '@/typings/vendor.types'
import { type AxiosError } from 'axios'
import { useLoggedInData } from '@/auth/AuthContext'

export const useGetFilteredUserVendors = (page?: number) => {
  const { userToken } = useLoggedInData()

  // TODO: Do I need to set a fallback here?
  // const fallback: VendorListQueryResult = {
  //   count: 0,
  //   vendors: [],
  // }

  // GET ALL LOGGED IN USER VENDORS
  const query = useQuery({
    queryKey: ['vendors', page],
    queryFn: () => vendorService.getFilteredUserVendors(page),
    staleTime: 1000 * 60 * 5,
    enabled: !!userToken,
  })

  return query
}

export const useGetAllUserVendors =
  (): UseQueryResult<VendorListQueryResult> => {
    const { userToken } = useLoggedInData()

    // TODO: Do I need to set a fallback here?
    // const fallback: VendorListQueryResult = {
    //   count: 0,
    //   vendors: [],
    // }

    // GET ALL LOGGED IN USER VENDORS
    const query = useQuery<VendorListQueryResult, AxiosError>({
      queryKey: ['vendors'],
      queryFn: () => vendorService.getAllUserVendors(),
      staleTime: 1000 * 60 * 5,
      enabled: !!userToken,
    })

    return query
  }

// GET SINGLE VENDOR HOOK
export const useGetSingleVendor = (
  vendorId: string
): UseQueryResult<VendorQueryResult> => {
  const { userToken } = useLoggedInData()

  // GET SINGLE VENDOR
  const query = useQuery<VendorQueryResult, AxiosError>({
    queryKey: ['vendors', vendorId],
    queryFn: () => vendorService.getSingleVendor(vendorId),
    enabled: !!userToken && !!vendorId,
  })

  return query
}
