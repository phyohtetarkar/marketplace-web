import { Category } from "../common/models";
import { buildQueryParams } from "../common/utils";

const basePath = "categories";

export async function getAllCategories(flat: boolean) {
  const query = buildQueryParams({
    flat: flat
  });
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/structural${query}`;
  return fetch(url).then((res) => res.json() as Promise<[Category]>);
}

export async function existsCateogryBySlug(slug: String) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/${slug}/exists`;
  return fetch(url).then((res) => res.json() as Promise<boolean>);
}
