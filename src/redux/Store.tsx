import React from 'react'
import {configureStore} from "@reduxjs/toolkit"
import {sliceReducer,counterReducer,cartReducer} from "./CreateSlice"

const Store = configureStore({
    reducer:{
        products:sliceReducer,
        counter:counterReducer,
        cart:cartReducer,
    }
})

export default Store
