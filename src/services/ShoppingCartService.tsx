import makeApiRequest from "../common/makeApiRequest";
import { CartItem } from "../common/models";
import { validateResponse } from "../common/utils";

const basePath = "cart-items";

export async function getCartItemsByUser() {
  const url = `profile/${basePath}`;
  // const resp = await fetch(url, {
  //   headers: {
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp.json() as Promise<CartItem[]>;
}

export async function countCartItemsByUser() {
  const url = `profile/cart-count`;
  // const resp = await fetch(url, {
  //   headers: {
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp.json() as Promise<number>;
}

export async function addToCart(value: CartItem) {
  const url = basePath;
  // const resp = await fetch(url, {
  //   method: "POST",
  //   body: JSON.stringify(value),
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(
    url,
    {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json"
      }
    },
    true
  );

  await validateResponse(resp);
}

export async function updateQuantity(value: CartItem) {
  const url = basePath;
  // const resp = await fetch(url, {
  //   method: "PUT",
  //   headers: {
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(
    url,
    {
      method: "PUT",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json"
      }
    },
    true
  );

  await validateResponse(resp);

  return resp.json() as Promise<CartItem>;
}

export async function removeFromCart(items: [CartItem]) {
  const url = basePath;
  // const resp = await fetch(url, {
  //   method: "DELETE",
  //   body: JSON.stringify(ids),
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(
    url,
    {
      method: "DELETE",
      body: JSON.stringify(items),
      headers: {
        "Content-Type": "application/json"
      }
    },
    true
  );

  await validateResponse(resp);
}
