import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; token: any }>()
);

export const logout = createAction('[Auth] Logout');