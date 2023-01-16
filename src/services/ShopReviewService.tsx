import { PageData, ShopReview } from "../common/models";
import {
  buildQueryParams,
  getAPIBasePath,
  getAuthHeader
} from "../common/utils";

const basePath = "shop-reviews";

export async function postReview(value: ShopReview) {
  const url = `${getAPIBasePath()}${basePath}`;
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAuthHeader()
    }
  });
}

export async function deleteReview(shopId: number) {
  const url = `${getAPIBasePath()}${basePath}/${shopId}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: await getAuthHeader()
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
  const url = `${getAPIBasePath()}${basePath}/${shopId}${query}`;
  return fetch(url).then((res) => res.json() as Promise<PageData<ShopReview>>);
}
