import makeApiRequest from "../common/makeApiRequest";
import { PageData, Product } from "../common/models";
import { buildQueryParams, validateResponse } from "../common/utils";

const basePath = "favorite-products";

export async function addToFavoriteProduct(productId: number) {
  const url = `${basePath}/${productId}`;
  // const resp = await fetch(url, {
  //   method: "POST",
  //   headers: {
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(
    url,
    {
      method: "POST"
    },
    true
  );

  await validateResponse(resp);
}

export async function deleteFavoriteProduct(productId: number) {
  const url = `${basePath}/${productId}`;
  // const resp = await fetch(url, {
  //   method: "DELETE",
  //   headers: {
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(
    url,
    {
      method: "DELETE"
    },
    true
  );

  await validateResponse(resp);
}

export async function checkFavorite(productId: number) {
  const query = buildQueryParams({
    "product-id": productId
  });
  const url = `${basePath}/${productId}/check`;
  // const resp = await fetch(url, {
  //   headers: {
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp.json() as Promise<boolean>;
}

export async function getFavoriteProducts(page?: number) {
  const query = buildQueryParams({
    page: page
  });
  const url = `profile/${basePath}${query}`;
  // const resp = await fetch(url, {
  //   headers: {
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Product>>;
}
