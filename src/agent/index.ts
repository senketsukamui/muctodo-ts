import _ from "lodash";
export const constructGenericRequestHeaders = () => ({
  "Content-Type": "application/json",
});

export const constructRequestHeaders = (params = {}) => {
  const authToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTkwMzM2MDIxLCJlbWFpbCI6IiJ9.H8GV_FFaXAYq2n-J_0-uaGuLZlHs3bU_5VtSZ0BH2rs";
  return {
    ...constructGenericRequestHeaders(),
    ...(authToken ? { Authorization: `JWT ${authToken}` } : {}),
    ...params,
  };
};

export const getRequest = (url: string, body = {}) => {
  return fetch(url, {
    method: "GET",
    headers: constructRequestHeaders(),
  }).then((response: Response) => {
    return response.json();
  });
};

export const postRequest = (url: string, body = {}) => {
  return fetch(url, {
    method: "POST",
    headers: constructRequestHeaders(),
    body: JSON.stringify(body),
  }).then((response: Response) => {
    if (response.ok) {
      console.log(response.json());
      return response.json();
    }
    console.error("Error");
  });
};

export const deleteRequest = (url: string, body = {}) => {
  return fetch(url, {
    method: "DELETE",
    headers: constructRequestHeaders(),
    body: JSON.stringify(body),
  }).then((response: Response) => {
    console.error("Error");
  });
};

export const patchRequest = (url: string, body = {}) => {
  return fetch(url, {
    method: "PATCH",
    headers: constructRequestHeaders(),
    body: JSON.stringify(body),
  }).then((response: Response) => {
    if (response.ok) {
      return response.json();
    }
    console.error("Error");
  });
};
