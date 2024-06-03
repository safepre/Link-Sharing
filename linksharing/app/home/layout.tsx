import { NavbarComponent } from '@/components/NavBar'

const HomeLayout = ({ children }) => {
  return (
    <>
      <NavbarComponent />

      <div className="mt-6 flex justify-center gap-6 px-6 ">
        <div className="bg-red-100 w-[1000px] h-[600px]"></div>
        <div className="relative bg-yellow-100 w-full h-[600px]">
          <div className="border-t absolute bg-blue-100 inset-x-0 bottom-0">
            e
          </div>
        </div>
      </div>
      {children}
    </>
  )
}

export default HomeLayout
