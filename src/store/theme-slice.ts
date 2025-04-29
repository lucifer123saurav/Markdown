import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface themeState {
    darkMode: boolean;
}

const initialState: themeState = {
    darkMode: false
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme(state) {
            state.darkMode = !state.darkMode;
        }
    }
})

export const { toggleTheme } = themeSlice.actions;
export type toggleThemeType =  ReturnType<typeof themeSlice.actions.toggleTheme>
export default themeSlice;