import { PageData, Product } from "../common/models";
import { buildQueryParams } from "../common/utils";

const basePath = "products";

interface ProductQuery {
  query?: String;
  categoryId?: number;
  shopId?: number;
  maxPrice?: number;
  page?: number;
}

export async function getProductBySlug(slug: String) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/${slug}`;
  return fetch(url).then((rest) => rest.json() as Promise<Product>);
}

export async function existsProductBySlug(slug: String) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/${slug}/exists`;
  return fetch(url).then((rest) => rest.json() as Promise<boolean>);
}

export async function deleteProduct(id: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/${id}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer <token>"
    }
  });
}

export async function findAllProducts(value: ProductQuery) {
  const query = buildQueryParams(value);

  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}${query}`;
  return fetch(url, {
    headers: {
      Authorization: "Bearer <token>"
    }
  }).then((res) => res.json() as Promise<PageData<Product>>);
}
