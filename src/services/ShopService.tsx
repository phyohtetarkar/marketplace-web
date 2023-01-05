import { PageData, Shop, ShopContact, ShopGeneral } from "../common/models";

const basePath = "shops";

export async function createShop() {}

export async function updateShop() {}

export async function deleteShop(shopId: string) {}

export async function getShop(slug: string) {
  try {
  } catch (e) {
    throw e;
  }
}

export async function getShops(page?: number) {
  const url = process.env.NEXT_PUBLIC_API_URL + basePath;
  return fetch(url, {
    headers: {
      Authorization: "Bearer <token>",
    },
  }).then((rest) => rest.json() as Promise<PageData<Shop>>);
}
export async function updateShopGeneral(shopGeneral: ShopGeneral) {
  const url =
    process.env.NEXT_PUBLIC_API_URL +
    `${basePath}/${shopGeneral.shopId}` +
    "/general";

  await fetch(url, {
    method: "PUT",
    body: JSON.stringify({ shopGeneral }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer <token>",
    },
  });
}

export async function updateShopContact(shopContact: ShopContact) {
  const url =
    process.env.NEXT_PUBLIC_API_URL +
    `${basePath}/${shopContact.id}` +
    "/contact";
  await fetch(url, {
    method: "PUT",
    body: JSON.stringify({ shopContact }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer <token>",
    },
  });
}

export async function getShopBySlug(slug: String) {
  const url = process.env.NEXT_PUBLIC_API_URL + `${basePath}/${slug}`;
  return fetch(url).then((res) => res.json() as Promise<Shop>);
}
