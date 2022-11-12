import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lang : 'en'
}

export const langSlice = createSlice({
    name : 'lang',
    initialState,
    reducers : {
        setLang : (state,payload)=>{
            state.lang = payload.payload;
        }
    }
})

export const {setLang} = langSlice.actions;
export default langSlice.reducer;