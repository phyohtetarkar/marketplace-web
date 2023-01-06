import { PageData, User, Shop } from "../common/models";

const basePath = "profile";

export async function updateProfile(value: User) {
  const url = process.env.NEXT_PUBLIC_API_URL + basePath;
  await fetch(url, {
    method: "PUT",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authrization: "Bearer <token>"
    }
  });
}

export async function getMyShops(page?: number) {
  let url = process.env.NEXT_PUBLIC_API_URL + `${basePath}/shops`;
  url +=  page ? `?page=${page}` : "";
  return fetch(url, {
    headers: {
      Authorization: "Bearer <token>"
    }
  }).then((rest) => rest.json() as Promise<PageData<Shop>>);
}