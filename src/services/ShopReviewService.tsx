import { PageData, ShopReview } from "../common/models";

const basePath = "shops";

export async function getReviews(id: number, page?: number) {
  const url = process.env.NEXT_PUBLIC_API_URL + `${basePath}/id=${id}/reviews`;
  return fetch(url, {
    headers: {
      Authorization: "Bearer <token>",
    },
  }).then((rest) => rest.json() as Promise<PageData<ShopReview>>);
}

export async function postReview(shopReview: ShopReview) {
  const url =
    process.env.NEXT_PUBLIC_API_URL +
    `${basePath}/id=${shopReview.shopId}/reviews`;
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({ shopReview }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer <token>",
    },
  });
}

export async function deleteReview(id: number, page?: number) {
  const url = process.env.NEXT_PUBLIC_API_URL + `${basePath}/id=${id}/reviews`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer <token>",
    },
  });
}
