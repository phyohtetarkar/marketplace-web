import dayjs from "dayjs";

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

export function buildQueryParams(params: any) {
  if (typeof params !== "object" || params instanceof Array) {
    return "";
  }

  let query = "";

  for (const p in params) {
    if (!params[0]) {
      continue;
    }
    const delimiter = query.length > 0 ? "&" : "?";
    query.concat(delimiter + `${p}=${params[p]}`);
  }

  return query;
}
