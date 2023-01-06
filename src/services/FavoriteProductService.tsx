import { PageData, Product } from "../common/models";

const basePath = "profile";

export async function getFavoriteProducts(page?: number) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/favorite-products`;
  url += page ? `?page=${page}` : "";
  return fetch(url, {
    headers: {
      Authorization: "Bearer <token>"
    }
  }).then((rest) => rest.json() as Promise<PageData<Product>>);
}

export async function addToFavoriteProduct(productId: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/favorite-products?product-id=${productId}`;
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer <token>"
    }
  })
}

export async function deleteFavoriteProduct(id: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/favorite-products?product-id=${id}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer <token>"
    }
  })
}