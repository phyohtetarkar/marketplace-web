import { Auth } from "aws-amplify";
import makeApiRequest from "../common/makeApiRequest";
import { AuthResult } from "../common/models";
import { getAPIBasePath, validateResponse } from "../common/utils";

const basePath = "auth";

export async function login({
  username,
  password
}: {
  username: string;
  password: string;
}) {
  // try {
  //   const user = await Auth.signIn({
  //     username: username,
  //     password: password
  //   });
  //   console.log(user);
  //   return user as CognitoUser;
  // } catch (error) {
  //   throw error;
  // }

  const body = { username, password };

  const url = `${basePath}/sign-in`;

  const resp = await makeApiRequest(url, {
    method: "POST",
    body: JSON.stringify(body),
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });

  await validateResponse(resp);

  return resp.json() as Promise<AuthResult>;
}

export async function signUp({
  otp,
  name,
  phone,
  password
}: {
  otp: string;
  name: string;
  phone: string;
  password: string;
}) {
  // try {
  //   const result = await Auth.signUp({
  //     username: phone,
  //     password: password,
  //     attributes: {
  //       name: name,
  //       phone_number: phone // optional - E.164 number convention
  //     },
  //     autoSignIn: {
  //       // optional - enables auto sign in after user is confirmed
  //       enabled: process.env.NEXT_PUBLIC_PROFILE !== "dev"
  //     }
  //   });
  //   console.log(result);
  //   return result;
  // } catch (error) {
  //   throw error;
  // }

  const body = { otp, fullName: name, username: phone, password };

  const url = `${basePath}/sign-up`;

  const resp = await makeApiRequest(url, {
    method: "POST",
    body: JSON.stringify(body),
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });

  await validateResponse(resp);

  return resp.json() as Promise<AuthResult>;
}

export async function signOut() {
  const url = `${basePath}/sign-out`;

  const resp = await makeApiRequest(
    url,
    {
      method: "POST"
    },
    true
  );

  await validateResponse(resp);
}

export async function confirmSignUp({
  phone,
  password,
  code
}: {
  phone: string;
  password: string;
  code: string;
}) {
  try {
    await Auth.confirmSignUp(phone, code, { forceAliasCreation: false });
  } catch (error) {
    throw error;
  }
}
