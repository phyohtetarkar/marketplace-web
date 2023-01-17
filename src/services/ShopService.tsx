import { PageData, Shop, ShopContact, ShopGeneral } from "../common/models";
import {
  buildQueryParams,
  getAPIBasePath,
  getAuthHeader
} from "../common/utils";

const basePath = "shops";

export async function getShops(page?: number) {
  const query = buildQueryParams({
    page: page
  });
  const url = `${getAPIBasePath()}${basePath}${query}`;
  const resp = await fetch(url, {
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  if (!resp.ok) {
    throw Error(await resp.text());
  }

  return resp.json() as Promise<PageData<Shop>>;
}

export async function updateShopGeneral(value: ShopGeneral) {
  const url = `${getAPIBasePath()}${basePath}/${value.shopId}/general`;

  const resp = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAuthHeader()
    }
  });

  if (!resp.ok) {
    throw Error(await resp.text());
  }
}

export async function updateShopContact(value: ShopContact) {
  const url = `${getAPIBasePath()}${basePath}/${value.id}/contact`;

  const resp = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAuthHeader()
    }
  });

  if (!resp.ok) {
    throw Error(await resp.text());
  }
}

export async function getShopBySlug(slug: String) {
  const url = `${getAPIBasePath()}${basePath}/${slug}`;
  const resp = await fetch(url);

  if (!resp.ok) {
    throw Error(await resp.text());
  }
  return resp.json() as Promise<Shop>;
}

export async function existsShopBySlug(slug: String, excludeId: number) {
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
