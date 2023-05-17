import makeApiRequest from "../common/makeApiRequest";
import { User } from "../common/models";
import { validateResponse } from "../common/utils";

const basePath = "profile";

export async function updateProfile(value: User) {
  const url = `${basePath}`;

  const resp = await makeApiRequest(
    url,
    {
      method: "PUT",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json"
      }
    },
    true
  );

  await validateResponse(resp);
}

export async function uploadUserImage(file: File) {
  const url = `${basePath}/image`;

  const form = new FormData();
  form.append("file", file);

  const resp = await makeApiRequest(
    url,
    {
      method: "PUT",
      body: form
    },
    true
  );

  await validateResponse(resp);
}

export async function getLoginUser() {
  const url = `${basePath}`;

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp.json() as Promise<User>;
}

export async function changePhoneNumber({
  phone,
  password,
  code,
  requestId
}: {
  phone: string;
  password: string;
  code: string;
  requestId: number;
}) {
  const body = { phone, password, code, requestId };

  const url = `${basePath}/phone`;

  const resp = await makeApiRequest(
    url,
    {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    },
    true
  );

  await validateResponse(resp);
}

export async function changePassword({
  oldPassword,
  newPassword
}: {
  oldPassword: string;
  newPassword: string;
}) {
  const url = `${basePath}/change-password?old-password=${oldPassword}&new-password=${newPassword}`;

  const resp = await makeApiRequest(
    url,
    {
      method: "PUT"
    },
    true
  );

  await validateResponse(resp);
}
