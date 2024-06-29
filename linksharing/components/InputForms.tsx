import { TextInput } from 'flowbite-react'
import { customThemeInput } from '../utils/helperTheme'

const InputForms = ({ user, setUser }) => {
  const handleInputChange = e => {
    setUser({ ...user, [e.target.id]: e.target.value })
  }

  return (
    <div className="bg-zinc-100 rounded-lg w-[739px] h-[200px] bg-gray-300">
      <div className="flex flex-row justify-between mt-3.5">
        <span className="m-4 text-slate-500">First name*</span>
        <TextInput
          className="m-2 w-[432px] mr-5"
          theme={customThemeInput}
          color="white"
          id="firstName"
          type="url"
          placeholder="e.g. John"
          required
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-row justify-between">
        <span className="m-4 text-slate-500">Last name*</span>
        <TextInput
          className="m-2 w-[432px] mr-5"
          theme={customThemeInput}
          color="white"
          id="lastName"
          type="url"
          placeholder="e.g. Appleseed"
          required
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-row justify-between">
        <span className="m-4 text-slate-500"> Email</span>
        <TextInput
          className="m-2 w-[432px] mr-5"
          theme={customThemeInput}
          color="white"
          id="email"
          type="url"
          placeholder="e.g. japple@email.com"
          required
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}

export default InputForms
