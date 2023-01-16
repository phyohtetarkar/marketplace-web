import { Banner } from "../common/models";
import { getAPIBasePath } from "../common/utils";

export async function getAllBanners() {
  const url = getAPIBasePath() + "banners";
  return fetch(url).then((res) => res.json() as Promise<Banner[]>);
}
