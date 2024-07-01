import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from './services/apiSlice';
import authReducer from './services/authSlice';
import searchDataReducer from './services/searchSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        searchData: searchDataReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export type RootState = ReturnType<(typeof store)['getState']>;
export type AppDispatch = (typeof store)['dispatch'];