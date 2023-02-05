import { Category } from "../common/models";
import {
  buildQueryParams,
  getAPIBasePath,
  validateResponse
} from "../common/utils";

const basePath = "categories";

export async function getAllCategories(flat: boolean) {
  const query = buildQueryParams({
    flat: flat
  });
  const url = `${getAPIBasePath()}${basePath}/structural${query}`;
  const resp = await fetch(url);

  await validateResponse(resp);

  return resp.json() as Promise<Category[]>;
}

export async function getCategory(slug: string) {
  const url = `${getAPIBasePath()}${basePath}/${slug}`;
  const resp = await fetch(url);

  await validateResponse(resp);

  return resp.json() as Promise<Category>;
}

export async function getBrandsByCategory(slug: string) {
  const url = `${getAPIBasePath()}${basePath}/${slug}/brands`;
  const resp = await fetch(url);

  await validateResponse(resp);

  return resp.json() as Promise<string[]>;
}

export async function existsCateogryBySlug(slug: String, excludeId: number) {
  const query = buildQueryParams({
    exclude: excludeId
  });
  const url = `${getAPIBasePath()}${basePath}/${slug}/exists${query}`;
  const resp = await fetch(url);

  await validateResponse(resp);

  return resp.json() as Promise<boolean>;
}
