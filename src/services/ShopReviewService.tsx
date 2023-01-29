import { PageData, ShopReview } from "../common/models";
import {
  buildQueryParams,
  getAPIBasePath,
  getAuthHeader,
  validateResponse
} from "../common/utils";

const basePath = "shop-reviews";

export async function writeReview(value: ShopReview) {
  const url = `${getAPIBasePath()}${basePath}`;
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);
}

export async function deleteReview(id: string) {
  const url = `${getAPIBasePath()}${basePath}/${id}`;
  const resp = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);
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

  await validateResponse(resp);

  return resp.json() as Promise<PageData<ShopReview>>;
}
