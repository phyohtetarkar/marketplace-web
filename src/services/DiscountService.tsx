import { Discount, PageData } from "../common/models";
import {
  buildQueryParams,
  getAPIBasePath,
  getAuthHeader
} from "../common/utils";

const basePath = "discounts";

export async function saveDiscount(value: Discount) {
  const url = `${getAPIBasePath()}${basePath}`;
  await fetch(url, {
    method: (value.shopId ?? 0) > 0 && !value.issuedAt ? "PUT" : "POST",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAuthHeader()
    }
  });
}
export async function deleteDiscount(shopId: number, issuedAt: String) {
  const url = `${getAPIBasePath()}${basePath}/${shopId}/${issuedAt}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: await getAuthHeader()
    }
  });
}

export async function getDiscountById(shopId: number, issuedAt: String) {
  const url = `${getAPIBasePath()}${basePath}/${shopId}/${issuedAt}`;
  return fetch(url, {
    headers: {
      Authorization: await getAuthHeader()
    }
  }).then((res) => res.json() as Promise<Discount>);
}

export async function getAllDiscounts(shopId: number, page?: number) {
  const query = buildQueryParams({
    "shop-id": shopId,
    page: page
  });

  const url = `${getAPIBasePath()}${basePath}${query}`;
  return fetch(url, {
    headers: {
      Authorization: await getAuthHeader()
    }
  }).then((res) => res.json() as Promise<PageData<Discount>>);
}
