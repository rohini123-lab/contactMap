import { createSlice } from '@reduxjs/toolkit';

export const contactSlice = createSlice({
  name: 'contact',
  initialState: [],
  reducers: {
    addContact: (state, action) => {
        return [...state, action.payload];
    },
    deleteContact: (state, action) => {
        return state.filter((contact) => contact.id !== action.payload.id);
    },
    editContact:(state, action) => {
        const { id, firstName, lastName, status } = action.payload;
        const updatedContactIndex = state.findIndex(contact => contact.id === id);
        if (updatedContactIndex !== -1) {
          const updatedContact = {
            ...state[updatedContactIndex],
            firstName,
            lastName,
            status,
          };
          state[updatedContactIndex] = updatedContact;
        }
    },
  },
});

export const { addContact,deleteContact,editContact } = contactSlice.actions;

export default contactSlice.reducer;