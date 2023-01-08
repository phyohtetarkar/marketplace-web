import { PageData, User, Shop } from "../common/models";
import { buildQueryParams } from "../common/utils";

const basePath = "profile";

export async function updateProfile(value: User) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}`;
  await fetch(url, {
    method: "PUT",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authrization: "Bearer <token>"
    }
  });
}

export async function getLoginUser() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}`;
  return fetch(url, {
    headers: {
      Authorization: "Bearer <token>"
    }
  }).then((rest) => rest.json() as Promise<User>);
}

export async function getMyShops(page?: number) {
  const query = buildQueryParams({
    page: page
  });
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/shops${query}`;
  return fetch(url, {
    headers: {
      Authorization: "Bearer <token>"
    }
  }).then((rest) => rest.json() as Promise<PageData<Shop>>);
}