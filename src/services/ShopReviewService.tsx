import makeApiRequest from "../common/makeApiRequest";
import { PageData, ShopReview } from "../common/models";
import {
  buildQueryParams,
  getAPIBasePath,
  validateResponse
} from "../common/utils";

const basePath = "shop-reviews";

export async function writeReview(value: ShopReview) {
  const url = `${getAPIBasePath()}${basePath}`;
  // const resp = await fetch(url, {
  //   method: "POST",
  //   body: JSON.stringify(value),
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(
    url,
    {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json"
      }
    },
    true
  );

  await validateResponse(resp);
}

export async function deleteReview(value: ShopReview) {
  const url = `${basePath}`;
  // const resp = await fetch(url, {
  //   method: "DELETE",
  //   headers: {
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(
    url,
    {
      method: "DELETE",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json"
      }
    },
    true
  );

  await validateResponse(resp);
}

export async function getUserReview(shopId: number) {
  const url = `${basePath}/${shopId}/me`;
  // const resp = await fetch(url, {
  //   headers: {
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp.body ? (resp.json() as Promise<ShopReview>) : null;
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
  const url = `${basePath}/${shopId}${query}`;
  //const resp = await fetch(url);

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp.json() as Promise<PageData<ShopReview>>;
}
