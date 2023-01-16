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
  return fetch(url, {
    headers: {
      Authorization: await getAuthHeader()
    }
  }).then((rest) => rest.json() as Promise<PageData<Shop>>);
}

export async function updateShopGeneral(value: ShopGeneral) {
  const url = `${getAPIBasePath()}${basePath}/${value.shopId}/general`;

  await fetch(url, {
    method: "PUT",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAuthHeader()
    }
  });
}

export async function updateShopContact(value: ShopContact) {
  const url = `${getAPIBasePath()}${basePath}/${value.id}/contact`;

  await fetch(url, {
    method: "PUT",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAuthHeader()
    }
  });
}

export async function getShopBySlug(slug: String) {
  const url = `${getAPIBasePath()}${basePath}/${slug}`;
  return fetch(url).then((res) => res.json() as Promise<Shop>);
}

export async function existsShopBySlug(slug: String) {
  const url = `${getAPIBasePath()}${basePath}/${slug}/exists`;
  return fetch(url).then((res) => res.json() as Promise<boolean>);
}
