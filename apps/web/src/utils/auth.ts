export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUserFromToken = () => {
  const token = getToken();

  if (!token) return null;

  try {
    //The atob() method of the Window interface decodes a string of data which has been encoded using Base64 encoding.
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
};