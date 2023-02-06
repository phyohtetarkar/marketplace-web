import { CartItem } from "../common/models";
import {
  getAPIBasePath,
  getAuthHeader,
  validateResponse
} from "../common/utils";

const basePath = "cart-items";

export async function getCartItemsByUser() {
  const url = getAPIBasePath() + basePath;
  const resp = await fetch(url, {
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);

  return resp.json() as Promise<CartItem[]>;
}

export async function addToCart(value: CartItem) {
  const url = getAPIBasePath() + basePath;
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);
}

export async function updateQuantity(id: number, quantity: number) {
  const url = `${getAPIBasePath()}${basePath}/${id}?quantity=${quantity}`;
  const resp = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);

  return resp.json() as Promise<CartItem>;
}

export async function removeFromCart(ids: [string]) {
  const url = getAPIBasePath() + basePath;
  const resp = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(ids),
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);
}
