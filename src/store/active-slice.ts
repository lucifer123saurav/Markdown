import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface currentItem {
    currentItem: string
}

const initialState: currentItem = {
    currentItem: '1'
};

const currentSlice = createSlice({
    name: 'current',
    initialState,
    reducers: {
        updateCurrentItem(state, action: PayloadAction<string>) {
            state.currentItem = action.payload;
        }
    }
})

export const { updateCurrentItem } = currentSlice.actions;
export default currentSlice;