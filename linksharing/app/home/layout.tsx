import { NavbarComponent } from '@/components/NavBar'

const HomeLayout = ({ children }) => {
  return (
    <>
      <div className="bg-zinc-50">
        <div className="p-2 px-6">
          <NavbarComponent />
        </div>
        <div className="mt-3 flex justify-center gap-6 px-6 ">
          <div className="bg-white w-[1000px] h-[725px]"></div>
          <div className="relative bg-white w-full h-[725px]">
            <div className="border-t absolute bg-white inset-x-0 bottom-0 h-16">
              ello
            </div>
          </div>
        </div>
      </div>
      <div className="bg-green-100">{children}</div>
    </>
  )
}

export default HomeLayout
