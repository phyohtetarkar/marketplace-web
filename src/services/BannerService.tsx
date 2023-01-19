import { Banner } from "../common/models";
import { getAPIBasePath, validateResponse } from "../common/utils";

export async function getAllBanners() {
  const url = getAPIBasePath() + "banners";
  const resp = await fetch(url);

  await validateResponse(resp);

  return resp.json() as Promise<Banner[]>;
}
