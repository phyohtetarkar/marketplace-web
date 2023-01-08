import { Banner } from "../common/models";

export async function getAllBanners() {
  const url = process.env.NEXT_PUBLIC_API_URL + "banners";
  return fetch(url).then((res) => res.json() as Promise<[Banner]>);
}
