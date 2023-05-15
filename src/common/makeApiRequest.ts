import { getAPIBasePath, getCookieValue } from "./utils";

async function makeApiRequest(
  url: string,
  options?: RequestInit | undefined,
  authenticated?: boolean
): Promise<Response> {
  // const csrfToken = sessionStorage.getItem("csrfToken");

  const headers = {
    ...options?.headers
  } as any;

  // headers["X-XSRF-TOKEN"] = csrfToken;

  if (authenticated) {
    const token = getCookieValue("accessToken") ?? "";
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`${getAPIBasePath()}/${url}`, {
    ...options,
    headers: headers
  });

  if (response.status === 401) {
    // access token has expired, try to refresh it
    const refreshResponse = await fetch(`${getAPIBasePath()}/auth/refresh`, {
      method: "POST",
      credentials: "include"
    });
    if (refreshResponse.ok) {
      const { accessToken } = await refreshResponse.json();
      // sessionStorage?.setItem("accessToken", accessToken);
      // retry original request with new access token
      const retryResponse = await makeApiRequest(url, options, authenticated);
      return retryResponse;
    }
  }
  return response;
}

export default makeApiRequest;
