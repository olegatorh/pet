import {createSlice} from "@reduxjs/toolkit";

export const searchDataSlice = createSlice({
  name: 'searchData',
  initialState: {
    items: [],
  },
  reducers: {
    setSearchData: (state, action) => {
      state.items = action.payload;
    },
  },
});


export const { setSearchData } = searchDataSlice.actions;
export default searchDataSlice.reducer;