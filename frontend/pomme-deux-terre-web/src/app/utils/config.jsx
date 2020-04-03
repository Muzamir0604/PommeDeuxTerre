// import store from "../store";

export const getConfig = () => {
  //   const isAuthenticated = store.getState().auth.isAuthenticated;
  //   if (isAuthenticated) {
  // const token = store.getState().auth.token;
  const config = {
    headers: {
      Authorization: "Token 9ec2b2caadeab8d9e9a9ada0f22f75c3ee6ac511"
    }
  };
  return config;
};
