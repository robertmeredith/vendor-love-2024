import { Spinner } from '@nextui-org/react'

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Spinner size="lg" />
    </div>
  )
}
export default Loading
