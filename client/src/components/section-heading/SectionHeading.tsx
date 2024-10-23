type SectionHeadingType = {
  heading: string
  text?: string
}

function SectionHeading({ heading, text }: SectionHeadingType) {
  return (
    <div className="border-b border-gray-200 pb-5 mb-20">
      <h1 className="text-4xl font-semibold leading-6 text-gray-900">
        {heading}
      </h1>
      <p className="mt-6 max-w-4xl text-sm text-gray-500">
        {text}
      </p>
    </div>
  )
}

export default SectionHeading
