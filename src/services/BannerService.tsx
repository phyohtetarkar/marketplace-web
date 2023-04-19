import makeApiRequest from "../common/makeApiRequest";
import { Banner } from "../common/models";
import { validateResponse } from "../common/utils";

export async function getAllBanners() {
  const url = "banners";
  //const resp = await fetch(url);

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp.json() as Promise<Banner[]>;
}
