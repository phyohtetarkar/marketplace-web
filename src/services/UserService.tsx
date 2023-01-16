import { PageData, User, Shop } from "../common/models";
import {
  buildQueryParams,
  getAPIBasePath,
  getAuthHeader
} from "../common/utils";

const basePath = "profile";

export async function updateProfile(value: User) {
  const url = `${getAPIBasePath()}${basePath}`;
  await fetch(url, {
    method: "PUT",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authrization: await getAuthHeader()
    }
  });
}

export async function getLoginUser() {
  const url = `${getAPIBasePath()}${basePath}`;
  return fetch(url, {
    headers: {
      Authorization: await getAuthHeader()
    }
  }).then((rest) => rest.json() as Promise<User>);
}

export async function getMyShops(page?: number) {
  const query = buildQueryParams({
    page: page
  });
  const url = `${getAPIBasePath()}${basePath}/shops${query}`;
  return fetch(url, {
    headers: {
      Authorization: await getAuthHeader()
    }
  }).then((rest) => rest.json() as Promise<PageData<Shop>>);
}
