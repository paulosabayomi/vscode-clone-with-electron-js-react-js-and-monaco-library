import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IFolderStructure, IMainState, TActiveFile, TIndent } from './types'

// Define the initial state using that type
const initialState: IMainState = {
  folder_structure: {} as IFolderStructure,
  active_files: [],
  active_file: {} as TActiveFile,
  indent: {
    column: 0,
    line: 0
  } as TIndent
}

export const mainSlice = createSlice({
  name: 'main',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    set_folder_structure: (state, action: PayloadAction<IFolderStructure>) => {
      state.folder_structure = action.payload
    },
    update_active_files: (state, action: PayloadAction<TActiveFile[]>) => {
      state.active_files = action.payload
    },
    update_active_file: (state, action: PayloadAction<TActiveFile>) => {
      state.active_file = action.payload
    },
    update_indent: (state, action: PayloadAction<TIndent>) => {
      state.indent = action.payload
    },
  },
})

export const { 
    set_folder_structure,
    update_active_files,
    update_active_file,
    update_indent
} = mainSlice.actions

export default mainSlice.reducer