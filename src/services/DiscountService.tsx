import { Discount, PageData } from "../common/models";
import {
  buildQueryParams,
  getAPIBasePath,
  getAuthHeader
} from "../common/utils";

const basePath = "discounts";

export async function saveDiscount(value: Discount) {
  const url = `${getAPIBasePath()}${basePath}`;
  const resp = await fetch(url, {
    method: value.id ? "PUT" : "POST",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAuthHeader()
    }
  });

  if (!resp.ok) {
    throw Error(await resp.text());
  }
}

export async function deleteDiscount(id: string) {
  const url = `${getAPIBasePath()}${basePath}/${id}`;
  const resp = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  if (!resp.ok) {
    throw Error(await resp.text());
  }
}

export async function getDiscountById(id: string) {
  const url = `${getAPIBasePath()}${basePath}/${id}`;
  const resp = await fetch(url, {
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  if (!resp.ok) {
    throw Error(await resp.text());
  }

  return resp.json() as Promise<Discount>;
}

export async function getAllDiscounts(shopId: number, page?: number) {
  const query = buildQueryParams({
    "shop-id": shopId,
    page: page
  });

  const url = `${getAPIBasePath()}${basePath}${query}`;
  const resp = await fetch(url, {
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  if (!resp.ok) {
    throw Error(await resp.text());
  }

  return resp.json() as Promise<PageData<Discount>>;
}
