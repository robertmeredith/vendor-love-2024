import { z } from 'zod'
import { DateValue, CalendarDate } from '@internationalized/date'

// Register Form Schema
export const registrationSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Business name must be at least 2 characters' }),
  category: z.string().trim().min(1, { message: 'Category is required' }),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Not a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(16, 'Password must not be greater than 16 characters'),
})

// Register Form Data Type
export type RegistrationFormData = z.infer<typeof registrationSchema>

// Login Form Schema
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email. Email must be a valid email address'),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters')
    .max(16, 'Password must not be greater than 16 characters'),
})

// Login Form Data Type
export type LoginFormData = z.infer<typeof loginSchema>

// New / Edit Vendor Form Schema
export const VendorFormSchema = z.object({
  _id: z.string().optional(),
  name: z
    .string()
    .trim()
    .min(1, { message: 'Vendor name is required' })
    .max(50, { message: 'Vendor name can not exceed 50 characters' }),
  instagram: z.string().trim().max(30, { message: 'Too Long!' }).optional(),
  website: z.string().trim().optional(),
  email: z
    .union([
      z.string().trim().email({
        message: 'Must be a valid email address',
      }),
      z.string().length(0),
    ])
    .optional(),
  notes: z.string().trim().optional(),
})

// New / Edit Vendor Form Data Type
export type VendorFormData = z.infer<typeof VendorFormSchema>

// Event Form VENDOR Schema
const EventFormVendorSchema = z.object({
  category: z
    .string()
    .min(1, { message: 'Category is required' })
    // .nullable()
    .refine((val) => val !== null, {
      message: 'Category is required',
    }),
  vendor: z.object({
    _id: z.string().optional(),
    name: z.string().trim().optional(),
    instagram: z.string().trim().max(30, { message: 'Too Long!' }).optional(),
    website: z.string().trim().optional(),
    email: z
      .union([
        z.string().trim().email({
          message: 'Invalid email',
        }),
        z.string().length(0),
      ])
      .optional(),
  }),
})

// New / Edit Event Form Schema
export const EventFormSchema = z.object({
  _id: z.string().optional(),
  user: z.string().optional(),
  client: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(40, 'Name must be less than 40 characters'),
  email: z
    .union([
      z.string().trim().email({
        message: 'Invalid email',
      }),
      z.string().length(0),
    ])
    .optional(),
  clientInstagram: z
    .string()
    .trim()
    .max(30, { message: 'Too Long!' })
    .optional(),
  partner: z
    .string()
    .trim()
    .max(40, 'Name must be less than 40 characters')
    .optional(),
  partnerInstagram: z
    .string()
    .trim()
    .max(30, { message: 'Too Long!' })
    .optional(),

  eventDate: z.custom<DateValue>(
    (val) => {
      if (val instanceof CalendarDate) {
        // Check if the date is within a reasonable range
        const year = val.year
        if (year >= 1900 && year <= 2100) {
          return true
        }
      }

      return false
    },
    {
      message: 'Please enter an event date',
    }
  ),
  vendors: z.array(EventFormVendorSchema),
})

// export type EventFormData = z.infer<typeof EventFormSchema>
