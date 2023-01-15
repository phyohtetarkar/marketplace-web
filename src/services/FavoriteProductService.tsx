import { PageData, Product } from "../common/models";
import { buildQueryParams, getAuthHeader } from "../common/utils";

const basePath = "profile";

export async function getFavoriteProducts(page?: number) {
  const query = buildQueryParams({
    page: page
  });
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/favorite-products${query}`;
  return fetch(url, {
    headers: {
      Authorization: getAuthHeader()
    }
  }).then((rest) => rest.json() as Promise<PageData<Product>>);
}

export async function addToFavoriteProduct(productId: number) {
  const query = buildQueryParams({
    "product-id": productId
  });
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/favorite-products?${query}`;
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: getAuthHeader()
    }
  })
}

export async function deleteFavoriteProduct(id: number) {
  const query = buildQueryParams({
    "product-id": id
  });
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/favorite-products?${query}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: getAuthHeader()
    }
  })
}