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
  const url = `delivery-cities`;

  const resp = await makeApiRequest(
    url,
    {
      method: "POST",
      body: JSON.stringify({ shopId: shopId, cities: cities }),
      headers: {
        "Content-Type": "application/json"
      }
    },
    true
  );

  await validateResponse(resp);
}

export async function getShopDeliveryCities(shopId: number) {
  const url = `delivery-cities?shop-id=${shopId}`;

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp.json() as Promise<City[]>;
}
