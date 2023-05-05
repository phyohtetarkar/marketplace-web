import makeApiRequest from "../common/makeApiRequest";
import { City } from "../common/models";
import { validateResponse } from "../common/utils";

export async function getAllCities() {
  const url = "cities";

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp.json() as Promise<City[]>;
}

export async function saveShopDeliveryCities(shopId: number, cities: City[]) {
  const url = `shops/${shopId}/delivery-cities`;

  const resp = await makeApiRequest(
    url,
    {
      method: "POST",
      body: JSON.stringify(cities),
      headers: {
        "Content-Type": "application/json"
      }
    },
    true
  );

  await validateResponse(resp);
}

export async function getShopDeliveryCities(shopId: number) {
  const url = `shops/${shopId}/delivery-cities`;

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp.json() as Promise<City[]>;
}
