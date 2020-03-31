import _ from "lodash";
export const constructGenericRequestHeaders = () => ({
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "https://muctodo.a6raywa1cher.com"
});

export const constructRequestHeaders = (params = {}) => {
  const authToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTg1Njc0MzcxLCJlbWFpbCI6IiJ9.sOiTl7mLdeelbJucql2blTDkQgzFkKyxj_ZsLCs_syg";
  return {
    ...constructGenericRequestHeaders(),
    ...(authToken ? { Authorization: `JWT ${authToken}` } : {}),
    ...params
  };
};

export const getRequest = (url: string, body = {}) => {
  return fetch(url, {
    method: "GET",
    headers: constructRequestHeaders()
  }).then((response: Response) => {
    console.log("response", response.json())
    return response.json();
  });
};
