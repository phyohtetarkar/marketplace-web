import { PageData, Shop, ShopContact, ShopGeneral } from "../common/models";
import { buildQueryParams, getAuthHeader } from "../common/utils";

const basePath = "shops";

export async function getShops(page?: number) {
  const query = buildQueryParams({
    page: page
  });
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}${query}`;
  return fetch(url, {
    headers: {
      Authorization: getAuthHeader()
    }
  }).then((rest) => rest.json() as Promise<PageData<Shop>>);
}

export async function updateShopGeneral(value: ShopGeneral) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/${value.shopId}/general`;

  await fetch(url, {
    method: "PUT",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader()
    }
  });
}

export async function updateShopContact(value: ShopContact) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/${value.id}/contact`;

  await fetch(url, {
    method: "PUT",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader()
    }
  });
}

export async function getShopBySlug(slug: String) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/${slug}`;
  return fetch(url).then((res) => res.json() as Promise<Shop>);
}

export async function existsShopBySlug(slug: String) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/${slug}/exists`;
  return fetch(url).then((res) => res.json() as Promise<boolean>);
}
