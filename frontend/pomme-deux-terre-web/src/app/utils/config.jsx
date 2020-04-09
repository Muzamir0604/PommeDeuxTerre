import store from "../store";

export const getConfig = () => {
  const isAuthenticated = store.getState().authReducer.isAuthenticated;
  if (isAuthenticated) {
    const token = store.getState().authReducer.token;
    const config = {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json",
      },
    };
    return config;
  }
  return null;
};
