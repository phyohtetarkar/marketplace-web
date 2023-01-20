import { PageData, Shop, ShopContact, ShopGeneral } from "../common/models";
import {
  buildQueryParams,
  getAPIBasePath,
  getAuthHeader,
  validateResponse
} from "../common/utils";

const basePath = "shops";

export async function createShop(value: Shop) {
  const url = getAPIBasePath() + basePath;
  const formData = new FormData();
  formData.append("name", value.name!);
  formData.append("slug", value.slug!);
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

  await validateResponse(resp);

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

  await validateResponse(resp);
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
