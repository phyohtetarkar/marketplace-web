import dayjs from "dayjs";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { APIError, ForbiddenError, UnauthorizeError } from "./customs";
import { Category, Discount, ValueType } from "./models";

export function formatTimestamp(timestamp?: number | string, withTime = false) {
  if (!timestamp) {
    return "";
  }
  let date = dayjs(timestamp);
  if (withTime) {
    return date.format("MMM DD, YYYY hh:mm A");
  }

  return date.format("MMM DD, YYYY");
}

export function formatNumber(value?: number) {
  if (typeof value !== "number" && typeof value !== "bigint") {
    return "";
  }
  
  if (isNaN(value)) {
    return "";
  }

  return Intl.NumberFormat("en-US").format(value);
}

export function formatAbbreviate(value: number) {
  if (!value) {
    return "0";
  }

  return Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
}

export function transformDiscount(discount: Discount, price = 0, qty = 1) {
  if (discount.type === "FIXED_AMOUNT") {
    return (price - (discount.value ?? 0)) * qty;
  }

  const percent = discount.value ?? 0;
  const discountPrice = (percent * price) / 100;
  return (price - discountPrice) * qty;
}

export function calcDiscount(
  type: ValueType,
  amount: number,
  value = 0,
  qty = 1
) {
  if (type === "FIXED_AMOUNT") {
    return (value - amount) * qty;
  }

  const percent = amount;
  const discounted = (percent * value) / 100;
  return (value - discounted) * qty;
}

export function wordPerMinute(wordCount: number) {
  const averageWordPerMinute = 200;
  const wpm = (wordCount * 60) / averageWordPerMinute;
  return Math.round(wpm / 60);
}

export function debounce(
  callback: (...args: any[]) => void | Promise<any>,
  timeout = 2000
) {
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
  if (!isNaN(parseFloat(v))) {
    const numRegex = "^([0-9]*[.])?[0-9]+$";
    return `${v}`.match(numRegex) ? parseFloat(v) : undefined;
  }

  return undefined;
}

export function setZeroOrNumber(v: any) {
  if (!isNaN(parseFloat(v))) {
    const numRegex = "^([0-9]*[.])?[0-9]+$";
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
}

export async function validateResponse(resp: Response, skipNotFound?: boolean) {
  if (resp.status === 401) {
    throw new UnauthorizeError("Unauthorized");
  }

  if (resp.status === 403) {
    throw new ForbiddenError();
  }
  
  if (resp.status === 500) {
    throw new APIError(resp.status, "Server error");
  }

  if (skipNotFound && resp.status === 404) {
    return;
  } else if (!resp.ok) {
    throw new APIError(resp.status, await resp.text());
  }
}

export function parseErrorResponse(error: any, skipAuth?: boolean) {
  if (error instanceof UnauthorizeError) {
    if (!skipAuth) {
      const href =  `${window?.location?.origin}/login`;
      window.location.href = href;
    }

    return "Unauthorized";
  }

  if (error instanceof ForbiddenError) {
    return "FORBIDDEN: You don't have permission to this resource";
  }

  if (error instanceof APIError) {
    return error.message;
  }

  if (error instanceof TypeError) {
    return "Server down";
  }

  //console.log(error);

  if (error instanceof FirebaseError) {
    if (error.code === AuthErrorCodes.USER_DELETED) {
      return "User not found.";
    }
  
    if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
      return "Password incorrect.";
    }
  
    if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
      return "Email or password incorrect.";
    }
  
    if (error.code === AuthErrorCodes.NETWORK_REQUEST_FAILED) {
      return "Network connection error.";
    }
  
    if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
      return "Account already exists with this email address.";
    }
  
    if (error.code === AuthErrorCodes.EXPIRED_OOB_CODE) {
      return "Verification code expired.";
    }
  
    if (error.code === AuthErrorCodes.INVALID_OOB_CODE) {
      return "Invalid verification code";
    }
  
    if (error.code === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
      return "Too many attempts. Please try again later.";
    }

    return "Something went wrong, please try again";
  }

  if (typeof error === "string" && error.length > 0) {
    return error;
  }

  return error?.message ?? "Something went wrong, please try again";
}

export function generateUUID() {
  return uuidv4();
}

export function getCategoryName(locale: string, category?: Category) {
  if (!category) {
    return "";
  }

  const localizedName = category.names?.find(c => c.lang === locale)?.name;

  if (!localizedName) {
    return category.name;
  }

  return localizedName;
}
