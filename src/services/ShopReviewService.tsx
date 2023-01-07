import { PageData, ShopReview } from "../common/models";
import { buildQueryParams } from "../common/utils";

const basePath = "shop-reviews";

export async function postReview(value: ShopReview) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}`;
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer <token>"
    }
  });
}

export async function deleteReview(shopId: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/${shopId}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer <token>"
    }
  });
}

export async function getReviews(
  shopId: number,
  direction: "ASC" | "DESC",
  page?: number
) {
  const query = buildQueryParams({
    direction: direction,
    page: page
  });
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/${shopId}${query}`;
  return fetch(url, {
    headers: {
      Authorization: "Bearer <token>"
    }
  }).then((res) => res.json() as Promise<PageData<ShopReview>>);
}
