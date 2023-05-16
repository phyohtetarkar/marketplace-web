import makeApiRequest from "../common/makeApiRequest";
import { User } from "../common/models";
import { validateResponse } from "../common/utils";

const basePath = "profile";

// export async function createUser(value: User) {
//   const url = `${getAPIBasePath()}users?api-key=${
//     process.env.NEXT_PUBLIC_API_KEY
//   }`;
//   const resp = await fetch(url, {
//     method: "POST",
//     body: JSON.stringify(value),
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });

//   await validateResponse(resp);
// }

export async function updateProfile(value: User) {
  const url = `${basePath}`;
  // const resp = await fetch(url, {
  //   method: "PUT",
  //   body: JSON.stringify(value),
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authrization: await getAuthHeader()
  //   }
  // });

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
  // const resp = await fetch(url, {
  //   headers: {
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp.json() as Promise<User>;
}
