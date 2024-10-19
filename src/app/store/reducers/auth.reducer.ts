// src/app/store/reducers/auth.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { login, logout } from '../actions/auth.actions';

export interface AuthState {
  username: string | null;
  token: string | null;
}

export const initialState: AuthState = {
  username: null,
  token: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, { username, token }) => ({ ...state, username, token })),
  on(logout, () => initialState)
);
