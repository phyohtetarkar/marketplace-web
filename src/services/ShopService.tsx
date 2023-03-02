import { PageData, Shop, ShopContact, ShopGeneral } from "../common/models";
import {
  buildQueryParams,
  getAPIBasePath,
  getAuthHeader,
  validateResponse
} from "../common/utils";

const basePath = "shops";

export interface ShopQuery {
  q?: string;
  page?: number;
}

export async function createShop(value: Shop) {
  const url = getAPIBasePath() + basePath;
  const formData = new FormData();
  formData.append("name", value.name!);
  value.slug && formData.append("slug", value.slug);
  value.headline && formData.append("headline", value.headline);
  value.about && formData.append("about", value.about);
  value.contact?.address && formData.append("address", value.contact.address);
  value.logoImage && formData.append("logoImage", value.logoImage);
  value.coverImage && formData.append("coverImage", value.coverImage);
  const resp = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);
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

  await validateResponse(resp);

  return resp.json() as Promise<Shop>;
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

  await validateResponse(resp);
}

export async function getShopBySlug(slug: String) {
  const url = `${getAPIBasePath()}${basePath}/${slug}`;
  const resp = await fetch(url);

  await validateResponse(resp);

  return resp.json() as Promise<Shop>;
}

export async function existsShopBySlug(slug: String, excludeId: number) {
  const query = buildQueryParams({
    exclude: excludeId
  });
  const url = `${getAPIBasePath()}${basePath}/${slug}/exists${query}`;
  const resp = await fetch(url);

  await validateResponse(resp);

  return resp.json() as Promise<boolean>;
}

export async function isShopMember(shopId: number) {
  try {
    const url = `${getAPIBasePath()}shop-members/check?shop-id=${shopId}`;

    const authHeader = await getAuthHeader();

    if (!authHeader) {
      return false;
    }

    const resp = await fetch(url, {
      headers: {
        Authorization: authHeader
      }
    });

    if (resp.ok) {
      return resp.json() as Promise<boolean>;
    }
  } catch (error) {}

  return false;
}

export async function getMyShops(page?: number) {
  const query = buildQueryParams({
    page: page
  });
  const url = `${getAPIBasePath()}shops/me${query}`;
  const resp = await fetch(url, {
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Shop>>;
}

export async function getShopHints(q: string) {
  const query = buildQueryParams({ q: q });
  const url = `${getAPIBasePath()}search/shop-hints${query}`;
  const resp = await fetch(url);

  await validateResponse(resp);

  return resp.json() as Promise<Shop[]>;
}

export async function findShops(query: ShopQuery) {
  const q = buildQueryParams({ ...query });
  const url = `${getAPIBasePath()}${basePath}${q}`;
  const resp = await fetch(url);

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Shop>>;
}
