import { UnauthorizeError } from "./customs";
import { firebaseAuth } from "./firebase.config";
import { getAPIBasePath } from "./utils";

interface Props {
  url: string;
  options?: RequestInit;
  authenticated?: boolean;
}

async function makeApiRequest({
  url,
  options = {},
  authenticated = false
}: Props): Promise<Response> {
  let requestOptions: RequestInit = {
    ...options,
  };

  if (authenticated) {
    if (!firebaseAuth.currentUser) {
      throw new UnauthorizeError();
    }
    const token = await firebaseAuth.currentUser.getIdToken();
    const headers = {
      ...requestOptions.headers,
      "Authorization": `Bearer ${token}`
    }
    requestOptions.credentials = "include";
    requestOptions.headers = headers;
  }

  const response = await fetch(`${getAPIBasePath()}${url}`, requestOptions);

  // if (response.status === 401) {
  //   // access token has expired, try to refresh it
  //   const refreshResponse = await fetch(`${getAPIBasePath()}/auth/refresh`, {
  //     ...requestOptions,
  //     method: "POST"
  //   });
  //   if (refreshResponse.ok) {
  //     const { accessToken, refreshToken } = await refreshResponse.json();
  //     // sessionStorage?.setItem("accessToken", accessToken);
  //     // retry original request with new access token
  //     const retryResponse = await makeApiRequest({
  //       url,
  //       options: {
  //         ...requestOptions
  //       },
  //       authenticated
  //     });
  //     return retryResponse;
  //   }
  // }
  return response;
}

export default makeApiRequest;
