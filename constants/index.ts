export const token = () => {
  if (typeof localStorage !== "undefined") {
    const token = localStorage.getItem("token");
    return token;
  }
  return null;
};
export const loginStatus = () => {
  if (typeof localStorage !== "undefined") {
    const loginStatus = localStorage.getItem("loginStatus");
    return loginStatus;
  }
  return null;
};
