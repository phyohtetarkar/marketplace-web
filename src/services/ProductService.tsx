import { PageData, Product } from "../common/models";
import {
  buildQueryParams,
  getAPIBasePath,
  getAuthHeader,
  validateResponse
} from "../common/utils";

const basePath = "products";

export interface ProductQuery {
  q?: String;
  "category-slug"?: number;
  "shop-id"?: number;
  "max-price"?: number;
  status?: "PUBLISHED";
  page?: number;
}

export async function getProductBySlug(slug: String) {
  const url = `${getAPIBasePath()}${basePath}/${slug}`;
  const resp = await fetch(url);

  await validateResponse(resp);

  return resp.json() as Promise<Product>;
}

export async function existsProductBySlug(slug: String) {
  const url = `${getAPIBasePath()}${basePath}/${slug}/exists`;
  const resp = await fetch(url);

  await validateResponse(resp);

  return resp.json() as Promise<boolean>;
}

export async function deleteProduct(id: number) {
  const url = `${getAPIBasePath()}${basePath}/${id}`;
  const resp = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);
}

export async function getProductHints(q: string) {
  const query = buildQueryParams({ q: q });
  const url = `${getAPIBasePath()}${basePath}/hints${query}`;
  const resp = await fetch(url);

  await validateResponse(resp);

  return resp.json() as Promise<Product[]>;
}

export async function findProducts(value: ProductQuery) {
  const query = buildQueryParams(value);

  const url = `${getAPIBasePath()}${basePath}${query}`;
  const resp = await fetch(url);

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Product>>;
}
