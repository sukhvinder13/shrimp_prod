// src/app/store/selectors/auth.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUsername = createSelector(
  selectAuthState,
  (state: AuthState) => state.username
);

export const selectToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);
