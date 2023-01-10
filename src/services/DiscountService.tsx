import { Discount, PageData } from "../common/models";
import { buildQueryParams } from "../common/utils";

const basePath = "discounts";

export async function saveDiscount(value: Discount) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}`;
  await fetch(url, {
    method: (value.shopId ?? 0) > 0 && !value.issuedAt ? "PUT" : "POST",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer <token>"
    }
  });
}
export async function deleteDiscount(shopId: number, issuedAt: String) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/${shopId}/${issuedAt}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer <token>"
    }
  });
}

export async function getDiscountById(shopId: number, issuedAt: String) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/${shopId}/${issuedAt}`;
  return fetch(url, {
    headers: {
      Authorization: "Bearer <token>"
    }
  }).then((res) => res.json() as Promise<Discount>);
}

export async function getAllDiscounts(shopId: number, page?: number) {
  const query = buildQueryParams({
    "shop-id": shopId,
    page: page
  });

  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}${query}`;
  return fetch(url, {
    headers: {
      Authorization: "Bearer <token>"
    }
  }).then((res) => res.json() as Promise<PageData<Discount>>);
}
