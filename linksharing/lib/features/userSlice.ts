import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface UserState {
  firstName: string
  lastName: string
  email: string
}

// Define the initial state using that type
const initialState: UserState = {
  firstName: '',
  lastName: '',
  email: '',
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.email = action.payload.email
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
