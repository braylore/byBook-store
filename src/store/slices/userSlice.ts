import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
  id: string | null;
  email: string | null;
}

const initialState: IUserState = {
  id: null,
  email: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
    },
    removeUser(state) {
      state.id = null;
      state.email = null;
    }
  }
});

export default userSlice.reducer;
export const { removeUser, setUser } = userSlice.actions;
