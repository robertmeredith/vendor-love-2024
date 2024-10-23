import { Divider, Skeleton } from '@nextui-org/react'

function EventFormSkeleton() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {/* make array of 6 and map over */}
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="rounded-lg">
            <div className="h-14"></div>
          </Skeleton>
        ))}
      </div>
      {/* array of 4 */}

      <Divider className="mt-10" />
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 mt-4 gap-2 items-center ">
        {Array.from({ length: 15 }).map((_, index) => (
          <Skeleton key={index} className="rounded-lg">
            <div className="h-14"></div>
          </Skeleton>
        ))}
      </div>
    </div>
  )
}
export default EventFormSkeleton
