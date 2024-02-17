import makeApiRequest from "@/common/makeApiRequest";
import { Category, ProductFilter } from "@/common/models";
import { buildQueryParams, validateResponse } from "@/common/utils";

export async function getAllCategories(root: boolean) {
  const query = buildQueryParams({
    root: root
  });
  const url = `/content/categories${query}`;

  const resp = await makeApiRequest({
    url
  });

  await validateResponse(resp);

  return resp.json() as Promise<Category[]>;
}

export async function getCategoryById(id: number) {
  const url = `/admin/categories/${id}`;

  const resp = await makeApiRequest({
    url,
    authenticated: true
  });

  await validateResponse(resp, true);

  return resp
    .json()
    .then((json) => json as Category)
    .catch((e) => null);
}

export async function getCategoryBySlug(slug: string) {
  const url = `/content/categories/${slug}`;

  const resp = await makeApiRequest({
    url,
    options: {
      cache: "no-store"
    }
  });

  await validateResponse(resp, true);

  return resp
    .json()
    .then((json) => json as Category)
    .catch((e) => null);
}

export async function getProductFilterByCategory(id: number) {
  const url = `/content/categories/${id}/product-filter`;

  const resp = await makeApiRequest({ url });

  await validateResponse(resp);

  return (await resp.json()) as ProductFilter;
}
