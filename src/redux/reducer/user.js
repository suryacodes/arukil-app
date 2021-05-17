import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {},
  token: '',
  loading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return (state = {
        ...state,
        ...action.payload,
      });
    },
    removeUser(state) {
      return (state = {});
    },
  },
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;
