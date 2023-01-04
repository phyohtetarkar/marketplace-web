import { PageData, Product } from "../common/models";

const basePath = "favorite-products";

export async function getFavoriteProducts() {
  const url = process.env.REACT_APP_API_URL + basePath;
  return fetch(url).then((rest) => rest.json() as Promise<PageData<Product>>);
}

export async function saveFavoriteProduct(productID: number) {
  const url = process.env.REACT_APP_API_URL + basePath;
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({id: productID}),
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer <token>"
    }
  })
}

export async function deleteFavoriteProduct(id: number) {
  const url = process.env.REACT_APP_API_URL + `${basePath}?product-id/${id}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer <token>"
    }
  })
}