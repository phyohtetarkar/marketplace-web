import makeApiRequest from "../common/makeApiRequest";
import { PageData, Product } from "../common/models";
import { buildQueryParams, validateResponse } from "../common/utils";

export async function addToFavoriteProduct(productId: number) {
  const url = `/content/products/${productId}/favorite`;
  const resp = await makeApiRequest({
    url,
    options: {
      method: "POST"
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function deleteFavoriteProduct(productId: number) {
  const url = `/content/products/${productId}/favorite`;
  const resp = await makeApiRequest({
    url,
    options: {
      method: "DELETE"
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function checkFavorite(productId: number) {
  const url = `/profile/favorite-products/${productId}/check`;

  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp);

  return resp.json() as Promise<boolean>;
}

export async function getFavoriteProducts(page?: number) {
  const query = buildQueryParams({
    page: page
  });
  const url = `/profile/favorite-products${query}`;

  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Product>>;
}
