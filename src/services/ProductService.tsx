import { METHODS } from "http";
import { Product } from "../common/models";
import { buildQueryParams } from "../common/utils";

const basePath = "products"

export async function getProductBySlug(slug: String) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/${slug}`;
  return fetch(url).then((rest) => rest.json() as Promise<Product>);
}

export async function existsBySlug(slug: String) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/${slug}/exists`
  return fetch(url).then((rest) => rest.json() as Promise<boolean>);
}

export async function deleteProduct(id: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/${id}`
  await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer <token>"
    }
  })
}