import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user_slice/user_slice';
import langReducer from './reducers/lang_slice/lang_slice';
import cartReducer from './reducers/added_items/added_items';
import isDarkReducer from './reducers/dark_mode/dark_mode_slice';
export const store = configureStore({
    reducer: {
        user: userReducer,
        lang: langReducer,
        cart: cartReducer,
        theme: isDarkReducer
    }
})