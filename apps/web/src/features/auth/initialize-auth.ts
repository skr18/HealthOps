import type { AppDispatch } from "../../app/store";
import { getUserFromToken } from "../../lib/auth-storage";
import {logout,setAuthenticatedUser,} from "./auth-slice";

export function initializeAuth(dispatch: AppDispatch): void {
  const user = getUserFromToken();

  if (user) {
    dispatch(setAuthenticatedUser(user));
    return;
  }

  dispatch(logout());
}

/*
1. Redux State: DESTROYED

Yes, your Redux state will be completely wiped out.

Why: Redux stores its data in the browser's active memory. When you refresh the page, the browser clears that memory and restarts your application. As a result, your Redux store reverts to its default, initial state.

2. Local Storage: NOT DESTROYED

No, items saved in localStorage are not destroyed.

Why: localStorage is a specific browser tool designed precisely to save client-side data. Data stored here survives page refreshes, tab closures, and even completely closing and reopening the browser.
*/