import { Banner } from "../common/models";
import { getAPIBasePath } from "../common/utils";

export async function getAllBanners() {
  const url = getAPIBasePath() + "banners";
  const resp = await fetch(url);

  if (!resp.ok) {
    throw Error(await resp.text());
  }

  return resp.json() as Promise<Banner[]>;
}
