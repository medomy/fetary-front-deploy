import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    isLoggedIn : false
}

export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUser : (state,payload)=>{
            console.log(payload);
            state.user = payload.payload;
        },
        setLoggedIn : (state,payload)=>{
            console.log(payload);
            state.isLoggedIn = payload.payload;
        }
    }
})

export const {setUser, setLoggedIn} = userSlice.actions;
export default userSlice.reducer;