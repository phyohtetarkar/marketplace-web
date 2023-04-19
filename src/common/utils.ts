import { Auth } from "aws-amplify";
import dayjs from "dayjs";
import { APIError, UnauthorizeError } from "./customs";
import { Discount } from "./models";

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

export function transformDiscount(discount: Discount, price = 0, qty = 1) {
  if (discount.type === "FIXED_AMOUNT") {
    return formatPrice((price - (discount.value ?? 0)) * qty);
  }

  const percent = discount.value ?? 0;
  const discountPrice = (percent * price) / 100;
  return formatPrice((price - discountPrice) * qty);
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
  if (!!v) {
    const numRegex = "^([0-9]*[.])?[0-9]+$";
    return `${v}`.match(numRegex) ? parseFloat(v) : undefined;
  }

  return undefined;
}

export function setZeroOrNumber(v: any) {
  if (!!v) {
    const numRegex = "^[0-9]+$";
    return `${v}`.match(numRegex) ? parseFloat(v) : undefined;
  }

  return 0;
}

export function setStringToSlug(v?: string) {
  return v
    ?.trim()
    .replaceAll(/[^\w-\s]*/g, "")
    .replaceAll(/\s+/g, "-")
    .toLowerCase();
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

export function getAuthHeader() {
  // try {
  //   const accessToken = (await Auth.currentSession())
  //     .getAccessToken()
  //     .getJwtToken();
  //   return "Bearer " + accessToken;
  // } catch (error) {}

  const token = sessionStorage.getItem("accessToken");
  // const accessToken = (await Auth.currentSession())
  //   .getAccessToken()
  //   .getJwtToken();
  if (!token) {
    return "";
  }

  return "Bearer " + token;
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
  if (error instanceof UnauthorizeError) {
    sessionStorage?.clear();
    // Auth.signOut()
    //   .catch(console.error)
    //   .finally(() => {
    //     const href = process.env.NEXT_PUBLIC_LOGIN_URL ?? "";
    //     window.location.href = href;
    //   });
    if (!skipAuth) {
      const href = process.env.NEXT_PUBLIC_LOGIN_URL ?? "";
      window.location.href = href;
    }

    return "Unauthorized";
  }
  if (error instanceof APIError) {
    if (error.message === "permission-denied") {
      return "Permission denied";
    }

    if (error.message === "server-error") {
      return "Something went wrong, please try again";
    }

    if (error?.message === "username-exists") {
      return "Phone number already in use";
    }

    if (error?.message === "bad-credentials") {
      return "Phone number or password incorrect";
    }

    return error.message;
  }

  console.log(error);
  return "Something went wrong, please try again";
}

export async function checkShopMember(shopId: number, auth: any) {
  try {
    const accessToken = (await auth.currentSession())
      ?.getAccessToken()
      ?.getJwtToken();

    const url = `${getAPIBasePath()}shop-members/check?shop-id=${shopId ?? 0}`;

    if (accessToken) {
      const resp = await fetch(url, {
        headers: {
          Authorization: "Bearer " + accessToken
        }
      });

      if (resp.ok) {
        return (await resp.json()) as boolean;
      }
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}
