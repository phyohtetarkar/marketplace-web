import { User } from "../common/models";
import {
  getAPIBasePath,
  getAuthHeader,
  validateResponse
} from "../common/utils";

const basePath = "profile";

export async function updateProfile(value: User) {
  const url = `${getAPIBasePath()}${basePath}`;
  const resp = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authrization: await getAuthHeader()
    }
  });

  await validateResponse(resp);
}

export async function getLoginUser() {
  const url = `${getAPIBasePath()}${basePath}`;
  const resp = await fetch(url, {
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);

  return resp.json() as Promise<User>;
}
