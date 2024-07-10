'use client'

import SaveButton from './SaveButton'

const Section = ({ children, title, description }) => {
  return (
    <>
      <div className="relative bg-white w-full h-[725px] rounded-t-md">
        <div className="m-10">
          <span className="font-semibold text-3xl">{title}</span>
          <div className="mt-1 mb-6">
            <span className="text-sm text-slate-500">{description}</span>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

export default Section
