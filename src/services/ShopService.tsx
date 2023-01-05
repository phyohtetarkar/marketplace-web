import { pageSizeLimit } from "../common/app.config";
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

export async function updateShopGeneral(id: number, shopGeneral: ShopGeneral) {
  const url = process.env.REACT_APP_API_URL + `${basePath}/${id}` + "/general";
  const data = new FormData();
  data.append("id", id.toString());
  data.append("name", shopGeneral.name);
  data.append("slug", shopGeneral.slug);
  data.append("headline", shopGeneral.headline!);
  data.append("about", shopGeneral.about!);
  await fetch(url, {
    method: "PUT",
    body: data,
  });
}

export async function updateShopContact(id: number, shopContact: ShopContact) {
  const url = process.env.REACT_APP_API_URL + `${basePath}/${id}` + "/contact";
  const data = new FormData();
  data.append("id", id.toString());
  data.append("address", shopContact.address!);
  data.append("phones", shopContact.phones!.toString());
  data.append("latitude", shopContact.latitude!.toString());
  data.append("longitude", shopContact.longitude!.toString());
  await fetch(url, {
    method: "PUT",
    body: data,
  });
}

export async function getShopBySlug(slug: String) {
  const url = process.env.REACT_APP_API_URL + `${basePath}/${slug}`;
  return fetch(url).then((res) => res.json() as Promise<Shop>);
}
