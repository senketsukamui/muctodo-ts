import _ from "lodash";
export const constructGenericRequestHeaders = () => ({
  "Content-Type": "application/json"
});

export const constructRequestHeaders = (params = {}) => {
  const authToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTg4MDk4MTk2LCJlbWFpbCI6IiJ9.IlvQxw6gvuXtAKACwwf9x7mmO2CdG57LGmAi1zhRolo";
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
    return response.json();
  });
};

export const postRequest = (url: string, body = {}) => {
  return fetch(url, {
    method: "POST",
    headers: constructRequestHeaders(),
    body: JSON.stringify(body)
  }).then((response: Response) => {
    if (response.ok) {
      return response.json();
    }
    console.error("Error")
  });
};
