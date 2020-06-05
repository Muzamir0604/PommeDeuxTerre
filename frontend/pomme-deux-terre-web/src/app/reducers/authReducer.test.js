import { SET_AUTH } from "../actions/types";
import guessWordsReducer from "./authReducer";

test("returns state to `True` upon receiving action of type `SET_AUTH`", () => {
  const tokenString = "muzamirisawesome";
  const initialState = [{ isAuthenticated: false, token: null }];
  const newState = guessWordsReducer(initialState, {
    type: SET_AUTH,
    payload: tokenString,
  });
  expect(newState.isAuthenticated).toBe(true)
  expect(newState.token).toBe(tokenString)
});
