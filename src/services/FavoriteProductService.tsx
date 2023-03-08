import { PageData, Product } from "../common/models";
import {
  buildQueryParams,
  getAPIBasePath,
  getAuthHeader,
  validateResponse
} from "../common/utils";

const basePath = "favorite-products";

export async function getFavoriteProducts(page?: number) {
  const query = buildQueryParams({
    page: page
  });
  const url = `${getAPIBasePath()}profile/${basePath}${query}`;
  const resp = await fetch(url, {
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Product>>;
}

export async function addToFavoriteProduct(productId: number) {
  const query = buildQueryParams({
    "product-id": productId
  });
  const url = `${getAPIBasePath()}${basePath}${query}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);
}

export async function deleteFavoriteProduct(productId: number) {
  const query = buildQueryParams({
    "product-id": productId
  });
  const url = `${getAPIBasePath()}${basePath}${query}`;
  const resp = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);
}

export async function checkFavorite(productId: number) {
  const query = buildQueryParams({
    "product-id": productId
  });
  const url = `${getAPIBasePath()}${basePath}/check${query}`;
  const resp = await fetch(url, {
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);

  return resp.json() as Promise<boolean>;
}
