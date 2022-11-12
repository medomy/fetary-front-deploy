import { createSlice, current } from "@reduxjs/toolkit";
import _ from "lodash";
const initialState = {
    addedItems : [],
}

export const cartSlice = createSlice({
    name : 'added_items',
    initialState,
    reducers : {
        addItems : (state,payload)=>{
            let _item = {...payload.payload , count :1};
            let existed_item = state.addedItems.find((item)=> item.id === _item.id);
            if(!existed_item) {
                state.addedItems.push(_item);
            } 
            else {
                state.addedItems.splice(state.addedItems.indexOf(existed_item) , 1);
                existed_item.count += 1;
                state.addedItems.push(existed_item);
            }
        },
        removeItems : (state,payload)=>{
            state.addedItems.splice(state.addedItems.indexOf(payload.payload),1);
        },
        increamentItem : (state , payload)=>{
            // console.log(current(state.addedItems))
            // console.log(current(state.addedItems).indexOf(payload.payload));
            state.addedItems.at(state.addedItems.indexOf(payload.payload)).count +=1;
        },
        decreamentItem : (state,payload)=>{
            if(state.addedItems.at(state.addedItems.indexOf(payload.payload)).count == 1) {
                state.addedItems.at(state.addedItems.indexOf(payload.payload)).count = 1;
            }
            else state.addedItems.at(state.addedItems.indexOf(payload.payload)).count -=1;
        },
        checkRestaurantsItems : (state , payload)=>{
            if(state.addedItems.find((item)=> item.restaurant_id !== state.addedItems[0].restaurant_id)){
                alert('can not add items from several restaurants to one order')
                state.addedItems.splice(0,state.addedItems.length);
            }
        }
    }
})
export const {addItems , removeItems , increamentItem , decreamentItem, checkRestaurantsItems} = cartSlice.actions;
export default cartSlice.reducer;