import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,

  reducers: {
    filterContact(state, action) {
      state.name = action.payload;
    },
  },
});
export const { filterContact } = filtersSlice.actions;
export default filtersSlice.reducer;

export const selectFilters = state => state.filter.name;
