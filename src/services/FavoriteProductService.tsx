import { PageData, Product } from "../common/models";

const basePath = "profile/favorite-products";

export async function getFavoriteProducts(page?: number) {
  const url = process.env.NEXT_PUBLIC_API_URL + basePath;
  return fetch(url, {
    headers: {
      Authorization: "Bearer <token>"
    }
  }).then((rest) => rest.json() as Promise<PageData<Product>>);
}

export async function addToFavoriteProduct(productId: number) {
  const url = process.env.NEXT_PUBLIC_API_URL + `${basePath}/product-id=${productId}`;
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer <token>"
    }
  })
}

export async function deleteFavoriteProduct(id: number) {
  const url = process.env.NEXT_PUBLIC_API_URL + `${basePath}/product-id=${id}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer <token>"
    }
  })
}