import makeApiRequest from "../common/makeApiRequest";
import { Discount, PageData } from "../common/models";
import { buildQueryParams, validateResponse } from "../common/utils";

const basePath = "discounts";

export async function saveDiscount(value: Discount) {
  const url = `${basePath}`;
  // const resp = await fetch(url, {
  //   method: !value.id ? "POST" : "PUT",
  //   body: JSON.stringify(value),
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(
    url,
    {
      method: !value.id ? "POST" : "PUT",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json"
      }
    },
    true
  );

  await validateResponse(resp);
}

export async function deleteDiscount(id: number) {
  const url = `${basePath}/${id}`;
  // const resp = await fetch(url, {
  //   method: "DELETE",
  //   headers: {
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(
    url,
    {
      method: "DELETE"
    },
    true
  );

  await validateResponse(resp);
}

export async function applyDiscount(discountId: number, productIds: [number]) {
  const url = `${basePath}/${discountId}/apply`;
  // const resp = await fetch(url, {
  //   method: "POST",
  //   body: JSON.stringify(productIds),
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(
    url,
    {
      method: "POST",
      body: JSON.stringify(productIds),
      headers: {
        "Content-Type": "application/json"
      }
    },
    true
  );

  await validateResponse(resp);
}

export async function removeDiscount(discountId: number, productId: number) {
  const url = `${basePath}/${discountId}/remove?product-id=${productId}`;
  // const resp = await fetch(url, {
  //   method: "POST",
  //   headers: {
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(
    url,
    {
      method: "POST"
    },
    true
  );

  await validateResponse(resp);
}

export async function getDiscountById(id: number) {
  const url = `${basePath}/${id}`;
  // const resp = await fetch(url, {
  //   headers: {
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp.json() as Promise<Discount>;
}

export async function findDiscounts(shopId: number, page?: number) {
  const query = buildQueryParams({
    "shop-id": shopId,
    paged: true,
    page: page
  });

  const url = `${basePath}${query}`;
  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Discount>>;
}

export async function findDiscountsUnPaged(shopId: number, page?: number) {
  const query = buildQueryParams({
    "shop-id": shopId,
    paged: false,
    page: page
  });

  const url = `${basePath}${query}`;
  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp.json() as Promise<Discount[]>;
}
