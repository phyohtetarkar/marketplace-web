import { Discount, PageData } from "../common/models";
import {
  buildQueryParams,
  getAPIBasePath,
  getAuthHeader,
  validateResponse
} from "../common/utils";

const basePath = "discounts";

export async function saveDiscount(value: Discount) {
  const url = `${getAPIBasePath()}${basePath}`;
  const resp = await fetch(url, {
    method: !value.id ? "POST" : "PUT",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);
}

export async function deleteDiscount(id: number) {
  const url = `${getAPIBasePath()}${basePath}/${id}`;
  const resp = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);
}

export async function applyDiscount(discountId: number, productIds: [number]) {
  const url = `${getAPIBasePath()}${basePath}/${discountId}/apply`;
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(productIds),
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);
}

export async function removeDiscount(discountId: number, productId: number) {
  const url = `${getAPIBasePath()}${basePath}/${discountId}/remove?product-id=${productId}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);
}

export async function getDiscountById(id: number) {
  const url = `${getAPIBasePath()}${basePath}/${id}`;
  const resp = await fetch(url, {
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);

  return resp.json() as Promise<Discount>;
}

export async function findDiscounts(shopId: number, page?: number) {
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

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Discount>>;
}
