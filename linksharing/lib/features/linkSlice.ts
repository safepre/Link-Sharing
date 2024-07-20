import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export interface LinkItem {
  id: string
  url: string
  platform: string
}

export interface LinkState {
  linkItems: LinkItem[]
}

const initialState: LinkState = {
  linkItems: [],
}

export const linkSlice = createSlice({
  name: 'link',
  initialState,
  reducers: {
    addLinkItem: state => {
      state.linkItems.push({ id: uuidv4(), url: '', platform: '' })
    },
    updateLinkItem: (
      state,
      action: PayloadAction<{ id: string; updatedData: Partial<LinkItem> }>
    ) => {
      const { id, updatedData } = action.payload
      const item = state.linkItems.find(item => item.id === id)
      if (item) {
        Object.assign(item, updatedData)
      }
    },
    removeLinkItem: (state, action: PayloadAction<string>) => {
      state.linkItems = state.linkItems.filter(
        item => item.id !== action.payload
      )
    },
  },
})

export const { addLinkItem, updateLinkItem, removeLinkItem } = linkSlice.actions

export default linkSlice.reducer
