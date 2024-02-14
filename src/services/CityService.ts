import makeApiRequest from "../common/makeApiRequest";
import { City } from "../common/models";
import { validateResponse } from "../common/utils";

export async function getAllCities() {
  const url = "/content/cities";

  const resp = await makeApiRequest({url, authenticated: true});

  await validateResponse(resp);

  return resp.json() as Promise<City[]>;
}
