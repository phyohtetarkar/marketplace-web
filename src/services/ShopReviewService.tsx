import { PageData, ShopReview } from "../common/models";
import {
  buildQueryParams,
  getAPIBasePath,
  getAuthHeader
} from "../common/utils";

const basePath = "shop-reviews";

export async function postReview(value: ShopReview) {
  const url = `${getAPIBasePath()}${basePath}`;
  const resp = await fetch(url, {
    method: "POST",
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

export async function deleteReview(shopId: number) {
  const url = `${getAPIBasePath()}${basePath}/${shopId}`;
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
  const resp = await fetch(url);

  if (!resp.ok) {
    throw Error(await resp.text());
  }

  return resp.json() as Promise<PageData<ShopReview>>;
}
