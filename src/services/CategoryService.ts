import makeApiRequest from "../common/makeApiRequest";
import { Category } from "../common/models";
import { buildQueryParams, validateResponse } from "../common/utils";

const basePath = "categories";

export async function getAllCategories(tree: boolean) {
  const query = buildQueryParams({
    tree: tree
  });
  const url = `${basePath}${query}`;

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp.json() as Promise<Category[]>;
}

export async function getCategory(slug: string) {
  const url = `${basePath}/${slug}`;
  //const resp = await fetch(url);

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp
    .json()
    .then((json) => json as Category)
    .catch((e) => null);
}

export async function getBrandsByCategory(id: number) {
  const url = `${basePath}/${id}/brands`;

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp.json() as Promise<string[]>;
}

// export async function existsCateogryBySlug(slug: String, excludeId: number) {
//   const query = buildQueryParams({
//     exclude: excludeId
//   });
//   const url = `${getAPIBasePath()}/${basePath}/${slug}/exists${query}`;
//   const resp = await fetch(url);

//   await validateResponse(resp);

//   return resp.json() as Promise<boolean>;
// }
