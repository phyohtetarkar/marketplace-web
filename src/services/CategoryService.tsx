import { Category } from "../common/models";
import { buildQueryParams, getAPIBasePath } from "../common/utils";

const basePath = "categories";

export async function getAllCategories(flat: boolean) {
  const query = buildQueryParams({
    flat: flat
  });
  const url = `${getAPIBasePath()}${basePath}/structural${query}`;
  const resp = await fetch(url);

  if (!resp.ok) {
    throw Error(await resp.text());
  }

  return resp.json() as Promise<Category[]>;
}

export async function existsCateogryBySlug(slug: String, excludeId: number) {
  const query = buildQueryParams({
    exclude: excludeId
  });
  const url = `${getAPIBasePath()}${basePath}/${slug}/exists${query}`;
  const resp = await fetch(url);

  if (!resp.ok) {
    throw Error(await resp.text());
  }

  return resp.json() as Promise<boolean>;
}
