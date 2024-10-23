import vendorService from '@/api/vendorService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '@/components/ui/use-toast'
import { VendorFormData } from '@/utils/zod.validation'

// DELETE VENDOR
export const useDeleteVendor = () => {
  // Initialise queryClient to clear queries on success
  const queryClient = useQueryClient()

  const deleteVendorMutation = useMutation({
    mutationFn: (vendorId: string) => vendorService.deleteVendor(vendorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      toast({
        title: 'Success!',
        description: 'Vendor deleted',
      })
    },
    onError: (error) => {
      console.log('ERROR - DELETE VENDOR ', error)
      toast({
        title: 'Error!',
        description: 'Failed to delete vendor',
      })
    },
  })

  return deleteVendorMutation
}

// CREATE VENDOR
export const useCreateVendor = () => {
  // Initialise queryClient to clear queries on success
  const queryClient = useQueryClient()

  const createVendorMutation = useMutation({
    mutationFn: (vendorData: VendorFormData) =>
      vendorService.createVendor(vendorData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      toast({
        title: 'Success!',
        description: 'New vendor created',
      })
    },
    onError: (error) => {
      console.log('ERROR - CREATE EVENT ', error)
      toast({
        title: 'Error!',
        description: 'Failed to create vendor',
      })
    },
  })

  return createVendorMutation
}

// UPDATE VENDOR
export const useUpdateVendor = () => {
  // Initialise queryClient to clear queries on success
  const queryClient = useQueryClient()

  const updateVendorMutation = useMutation({
    mutationFn: (vendorData: VendorFormData) =>
      vendorService.updateVendor(vendorData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      toast({
        title: 'Success!',
        description: 'Vendor updated',
      })
    },
    onError: (error) => {
      console.log('ERROR - UPDATE VENDOR ', error)
      toast({
        title: 'Error!',
        description: 'Failed to update vendor',
      })
    },
  })

  return updateVendorMutation
}
