import { Auth } from "aws-amplify";
import dayjs from "dayjs";
import { APIError, UnauthorizeError } from "./customs";

export function formatTimestamp(timestamp: number | string, withTime = false) {
  let date = dayjs(timestamp);
  if (withTime) {
    return date.format("MMM DD, YYYY hh:mm A");
  }

  return date.format("MMM DD, YYYY");
}

export function formatPrice(value: number) {
  if (isNaN(value) || `${value}`.trim().length === 0) {
    return "";
  }

  return Intl.NumberFormat("en-US").format(value);
}

export function transformDiscount(
  price = 0,
  discount = { value: 0, type: "fixed" }
) {
  if (discount.type === "fixed") {
    return formatPrice(discount.value);
  }

  const percent = discount.value;
  const discountPrice = (percent * price) / 100;
  return formatPrice(price - discountPrice);
}

export function wordPerMinute(wordCount: number) {
  const averageWordPerMinute = 200;
  const wpm = (wordCount * 60) / averageWordPerMinute;
  return Math.round(wpm / 60);
}

export function debounce(callback: (...args: any[]) => void, timeout = 2000) {
  if (typeof window === "undefined") {
    return () => {};
  }
  let timer: NodeJS.Timeout;

  return (...args: any[]) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      callback && callback.apply(null, args);
    }, timeout);
  };
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function setEmptyOrString(v: any) {
  if (typeof v === "string") {
    return v.trim().length > 0 ? v.trim() : undefined;
  }

  return undefined;
}

export function setEmptyOrNumber(v: any) {
  if (typeof v === "string") {
    return v.trim().length > 0 ? parseInt(v) : undefined;
  }

  return undefined;
}

export function buildQueryParams(params: any) {
  if (typeof params !== "object" || params instanceof Array) {
    return "";
  }

  let query = "";

  for (const p in params) {
    const value = params[p];
    if (value === undefined || value === null) {
      continue;
    }

    const delimiter = query.length > 0 ? "&" : "?";

    if (value instanceof Array) {
      query += delimiter + value.map((v) => `${p}=${v}`).join("&");
    } else {
      query += delimiter + `${p}=${value}`;
    }
  }

  return query;
}

export function getAPIBasePath() {
  return process.env.NEXT_PUBLIC_API_URL ?? "";
  //return location.origin + ":8080/api/v1/";
}

export async function getAuthHeader() {
  try {
    const accessToken = (await Auth.currentSession())
      .getAccessToken()
      .getJwtToken();
    return "Bearer " + accessToken;
  } catch (error) {}
  return "";
}

export async function validateResponse(resp: Response) {
  if (resp.status === 401) {
    throw new UnauthorizeError("Unauthorized");
  }
  if (resp.status === 500) {
    throw new APIError(resp.status, "server-error");
  }
  if (!resp.ok) {
    throw new APIError(resp.status, await resp.text());
  }
}

export function parseErrorResponse(error: any, skipAuth?: boolean) {
  if (error instanceof UnauthorizeError && !skipAuth) {
    Auth.signOut()
      .catch(console.error)
      .finally(() => {
        const href = process.env.NEXT_PUBLIC_LOGIN_URL ?? "";
        window.location.href = href;
      });
    return null;
  }
  if (error instanceof APIError) {
    return error.message;
  }
  //console.log(error);
  return "Something went wrong, please try again";
}
