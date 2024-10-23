// import {
//   Autocomplete,
//   AutocompleteItem,
//   Button,
//   DatePicker,
//   Input,
// } from '@nextui-org/react'
// import { useForm, Controller } from 'react-hook-form' // Import useForm
// import { mockVendors } from '@/api/mock-data'

// type formData = {
//   vendorName: string | undefined
//   vendorType: string | undefined
// }

// function TestPage() {
//   const form = useForm<formData>({
//     defaultValues: {
//       vendorName: undefined,
//       vendorType: undefined,
//     },
//   }) // Define form data type

//   const { control, handleSubmit } = form

//   const onSubmit = (data: { vendorName: string | undefined }) => {
//     console.log('Test Form Data:', data)
//   }

//   return (
//     <div className="bg-slate-50 flex w-100">
//       <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5">
//         {/* AUTOCOMPLETE */}
//         <Controller
//           control={control}
//           name="vendorName"
//           render={({ field: { onChange, onBlur, value, ref } }) => (
//             <Autocomplete
//               allowsCustomValue={true}
//               label="Vendor Name"
//               onSelectionChange={(val) => onChange(val)}
//               onBlur={onChange}
//               value={value}
//               ref={ref}
//             >
//               {mockVendors.map((v) => {
//                 return <AutocompleteItem key={v._id}>{v.name}</AutocompleteItem>
//               })}
//             </Autocomplete>
//           )}
//         />
//         {/* INPUT */}
//         <Controller
//           control={control}
//           name="vendorType"
//           render={({ field }) => <Input {...field} label="Vendor Type" size="md"/>}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </div>
//   )
// }

// export default TestPage

function TestPage() {
  return (
    <div>TestPage</div>
  )
}
export default TestPage