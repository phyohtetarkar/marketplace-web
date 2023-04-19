import makeApiRequest from "../common/makeApiRequest";
import { PageData, Shop, ShopContact, ShopGeneral } from "../common/models";
import {
  buildQueryParams,
  getAuthHeader,
  validateResponse
} from "../common/utils";

const basePath = "shops";

export interface ShopQuery {
  q?: string;
  page?: number;
}

export async function createShop(value: Shop) {
  const url = basePath;
  const formData = new FormData();
  formData.append("name", value.name!);
  value.slug && formData.append("slug", value.slug);
  value.headline && formData.append("headline", value.headline);
  value.about && formData.append("about", value.about);
  value.contact?.address && formData.append("address", value.contact.address);
  value.logoImage && formData.append("logo", value.logoImage);
  value.coverImage && formData.append("cover", value.coverImage);
  // const resp = await fetch(url, {
  //   method: "POST",
  //   body: formData,
  //   headers: {
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(
    url,
    {
      method: "POST",
      body: formData
    },
    true
  );

  await validateResponse(resp);
}

export async function updateShopGeneral(value: ShopGeneral) {
  const url = `${basePath}/${value.shopId}/general`;

  // const resp = await fetch(url, {
  //   method: "PUT",
  //   body: JSON.stringify(value),
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(
    url,
    {
      method: "PUT",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json"
      }
    },
    true
  );

  await validateResponse(resp);

  return resp.json() as Promise<Shop>;
}

export async function updateShopContact(value: ShopContact) {
  const url = `${basePath}/${value.shopId}/contact`;

  // const resp = await fetch(url, {
  //   method: "PUT",
  //   body: JSON.stringify(value),
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(
    url,
    {
      method: "PUT",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json"
      }
    },
    true
  );

  await validateResponse(resp);
}
export async function getShopById(id: number) {
  const url = `${basePath}/${id}`;
  // const resp = await fetch(url, {
  //   headers: {
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp.json() as Promise<Shop>;
}

export async function getShopBySlug(slug: String) {
  const url = `${basePath}/${slug}`;
  //const resp = await fetch(url);

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp.json() as Promise<Shop>;
}

export async function existsShopBySlug(slug: String, excludeId: number) {
  const query = buildQueryParams({
    exclude: excludeId
  });
  const url = `${basePath}/${slug}/exists${query}`;
  //const resp = await fetch(url);

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp.json() as Promise<boolean>;
}

export async function isShopMember(shopId: number) {
  try {
    const url = `${basePath}/${shopId}/check-member`;

    const authHeader = getAuthHeader();

    if (!authHeader) {
      return false;
    }

    // const resp = await fetch(url, {
    //   headers: {
    //     Authorization: authHeader
    //   }
    // });

    const resp = await makeApiRequest(url, {}, true);

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
  const url = `profile/${basePath}${query}`;
  // const resp = await fetch(url, {
  //   headers: {
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Shop>>;
}

export async function getShopHints(q: string) {
  const query = buildQueryParams({ q: q });
  const url = `search/shop-hints${query}`;
  //const resp = await fetch(url);

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp.json() as Promise<string[]>;
}

export async function findShops(query: ShopQuery) {
  const q = buildQueryParams({ ...query });
  const url = `${basePath}${q}`;
  //const resp = await fetch(url);

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Shop>>;
}
