export const getShortString = (str: string | null) => {
  if (!str) {
    return "...";
  }
  const maxLen = 75;
  const strLen = str.length;
  const newString = str.substr(0, maxLen);
  return `${newString}${strLen > maxLen ? "..." : ""}`;
};

export const setLocalStorageToken = (str: string | null) => {
  if (str === null) {
    return true;
  }
  localStorage.setItem("token", str);
};

export const deleteLocalStorageToken = () => {
  localStorage.removeItem("token");
};

export const getLocalStorageToken = () => {
  return localStorage.getItem("token");
};
