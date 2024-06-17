'use client'

import { Button, Label, TextInput } from 'flowbite-react'
import { useFormState } from 'react-dom'
import { registerUser } from '../actions/auth'
import { customThemeInput } from '@/utils/helperTheme'
const initState = { message: null }

function RegisterForm() {
  const [formState, action] = useFormState(registerUser, initState)
  console.log('formState' + formState)
  return (
    <form action={action} className="flex max-w-md flex-col gap-4">
      <div>
        <span className="font-semibold text-2xl">Create account</span>
        <div className="mt-1 mb-6">
          <span className="text-sm text-slate-500">
            Let's get you started sharing your links!
          </span>
        </div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Email address" />
        </div>
        <TextInput
          name="email"
          type="email"
          placeholder="name@flowbite.com"
          color={formState?.message === 'Invalid email' ? 'failure' : 'gray'}
          required
        />
        {formState?.message === 'Invalid email' && (
          <p className="text-red-600">{formState.message}</p>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Create password" />
        </div>
        <TextInput
          theme={customThemeInput}
          name="password"
          type="password"
          placeholder="At least 8 characters"
          color={
            formState?.message === 'String must contain at least 8 character(s)'
              ? 'failure'
              : 'gray'
          }
          required
        />
        {formState?.message ===
          'String must contain at least 8 character(s)' && (
          <p className="text-red-600">{formState.message}</p>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Confirm password" />
        </div>
        <TextInput
          name="confirmpassword"
          type="password"
          color={
            formState?.message === 'String must contain at least 8 character(s)'
              ? 'failure'
              : 'gray'
          }
          required
        />
        {formState?.message ===
          'String must contain at least 8 character(s)' && (
          <p className="text-red-600">{formState.message}</p>
        )}
      </div>
      <Button color="purple" type="submit">
        Create new account
      </Button>
    </form>
  )
}

export default RegisterForm
