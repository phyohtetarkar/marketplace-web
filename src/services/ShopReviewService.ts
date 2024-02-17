import makeApiRequest from "../common/makeApiRequest";
import { PageData, ShopReview } from "../common/models";
import { buildQueryParams, validateResponse } from "../common/utils";

export async function writeReview(values: ShopReview) {
  const url = `/content/shops/${values.shopId}/reviews`;

  const resp = await makeApiRequest({
    url,
    options: {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      }
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function getUserReview(shopId: number, userId: number) {
  const url = `/content/shops/${shopId}/reviews/${userId}`;

  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp);

  return resp.body ? (resp.json() as Promise<ShopReview>) : null;
}

export async function getReviews(shopId: number, page?: number) {
  const query = buildQueryParams({
    page: page
  });
  const url = `/content/shops/${shopId}/reviews${query}`;

  const resp = await makeApiRequest({ url });

  await validateResponse(resp);

  return resp.json() as Promise<PageData<ShopReview>>;
}
