import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDarkMode : false,
    mode:'light mode'
}

export const darkModeSlice = createSlice({
    name : 'isDark',
    initialState,
    reducers : {
        changeIsDark : (state,payload)=>{
            state.isDarkMode = payload.payload;
            state.isDarkMode ? state.mode = "dark mode" : state.mode = "light mode";
        },
    }
})

export const {changeIsDark} = darkModeSlice.actions;
export default darkModeSlice.reducer;