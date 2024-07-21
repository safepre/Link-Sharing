import { Button } from 'flowbite-react'
import ProfileCard from '../../components/ProfileCard'
const PreviewLayout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col bg-purple-600 h-[357px] rounded-b-3xl p-6">
        <div className="flex bg-white p-4 rounded-lg mb-4 justify-between">
          <Button href="/home" color="light">
            Back to editor
          </Button>
          <Button color="purple">Share Link</Button>
        </div>
        <div className="flex justify-center m-10 text-white">
          <ProfileCard />
        </div>
        {children}
      </div>
    </>
  )
}

export default PreviewLayout
