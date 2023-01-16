import { PageData, Product } from "../common/models";
import {
  buildQueryParams,
  getAPIBasePath,
  getAuthHeader
} from "../common/utils";

const basePath = "products";

export interface ProductQuery {
  q?: String;
  categoryId?: number;
  shopId?: number;
  maxPrice?: number;
  page?: number;
}

export async function getProductBySlug(slug: String) {
  const url = `${getAPIBasePath()}${basePath}/${slug}`;
  return fetch(url).then((rest) => rest.json() as Promise<Product>);
}

export async function existsProductBySlug(slug: String) {
  const url = `${getAPIBasePath()}${basePath}/${slug}/exists`;
  return fetch(url).then((rest) => rest.json() as Promise<boolean>);
}

export async function deleteProduct(id: number) {
  const url = `${getAPIBasePath()}${basePath}/${id}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: await getAuthHeader()
    }
  });
}

export async function findAllProducts(value: ProductQuery) {
  const query = buildQueryParams(value);

  const url = `${getAPIBasePath()}${basePath}${query}`;
  return fetch(url).then((res) => res.json() as Promise<PageData<Product>>);
}
