import { Discount, PageData } from "../common/models";
import { buildQueryParams } from "../common/utils";

const basePath = "discounts";

export async function saveDiscount(value: Discount) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}`;
  await fetch(url, {
    method: value.id! > 0 ? "PUT" : "POST",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer <token>"
    }
  });
}

export async function getDiscountById(id: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/${id}`;
  return fetch(url).then((res) => res.json() as Promise<Discount>);
}

export async function getAllDiscounts(shopId: number, page?: number) {
  const query = buildQueryParams({
    "shop-id": shopId,
    page: page
  });

  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}${query}`;
  return fetch(url).then((res) => res.json() as Promise<PageData<Discount>>);
}
