'use client'

import { Button, Label, TextInput } from 'flowbite-react'
import { customThemeInput } from '../utils/helperTheme'
import { signinUser } from '@/actions/auth'
import { useFormState } from 'react-dom'
const initState = { message: null }

function LoginForm() {
  const [formState, action] = useFormState(signinUser, initState)

  return (
    <form className="flex max-w-md flex-col gap-4" action={action}>
      <div>
        <span className="font-semibold text-2xl">Login</span>
        <div className="mt-1 mb-6">
          <span className="text-sm text-slate-500">
            Let's get you started sharing your links!
          </span>
        </div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Email address" />
        </div>
        <TextInput
          theme={customThemeInput}
          name="email"
          type="email"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Password" />
        </div>
        <TextInput
          theme={customThemeInput}
          name="password"
          placeholder="Enter your password"
          type="password"
          required
        />
      </div>
      <Button type="submit">Login</Button>
    </form>
  )
}

export default LoginForm
