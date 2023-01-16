import { Category } from "../common/models";
import { buildQueryParams, getAPIBasePath } from "../common/utils";

const basePath = "categories";

export async function getAllCategories(flat: boolean) {
  const query = buildQueryParams({
    flat: flat
  });
  const url = `${getAPIBasePath()}${basePath}/structural${query}`;
  return fetch(url).then((res) => res.json() as Promise<Category[]>);
}

export async function existsCateogryBySlug(slug: String) {
  const url = `${getAPIBasePath()}${basePath}/${slug}/exists`;
  return fetch(url).then((res) => res.json() as Promise<boolean>);
}
