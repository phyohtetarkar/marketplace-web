import { firebaseAuth } from "@/common/firebase.config";
import makeApiRequest from "@/common/makeApiRequest";
import { User, UserEdit, UserStatistic } from "@/common/models";
import { validateResponse } from "@/common/utils";
import { updateProfile } from "firebase/auth";

export async function updateUser(values: UserEdit) {
  const url = `/profile`;

  const resp = await makeApiRequest({
    url,
    options: {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      }
    },
    authenticated: true
  });

  const auth = firebaseAuth;

  let retry = 0;

  do {
    try {
      await updateProfile(auth.currentUser!, {
        displayName: values.name
      });
      retry = 3;
    } catch (error) {
      retry += 1;
    }
  } while (retry < 3);

  await validateResponse(resp);
}

export async function uploadUserImage(file: File) {
  const url = `/profile/image`;

  const form = new FormData();
  form.append("file", file);

  const resp = await makeApiRequest({
    url,
    options: {
      method: "PUT",
      body: form
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function getLoginUser() {
  const url = `/profile`;

  const resp = await makeApiRequest({
    url,
    authenticated: true
  });

  await validateResponse(resp);

  return resp.json() as Promise<User>;
}

export async function getUserStatistic() {
  const url = `/profile/statistic`;

  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp);

  return (await resp.json()) as UserStatistic;
}
