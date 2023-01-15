import { CartItem, CartItemId } from "../common/models";
import { getAuthHeader } from "../common/utils";

const basePath = "cart-items";

export async function getCartItemsByUser() {
  const url = process.env.NEXT_PUBLIC_API_URL + basePath;
  return fetch(url, {
    headers: {
      Authorization: getAuthHeader()
    }
  }).then((res) => res.json() as Promise<CartItem[]>);
}

export async function addToCart(value: CartItem) {
  const url = process.env.NEXT_PUBLIC_API_URL + basePath;
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader()
    }
  });
}

export async function updateQuantity(value: CartItem) {
  const url = process.env.NEXT_PUBLIC_API_URL + basePath;
  await fetch(url, {
    method: "PUT",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader()
    }
  });
}

export async function removeFromCart(ids: [CartItemId]) {
  const url = process.env.NEXT_PUBLIC_API_URL + basePath;
  await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(ids),
    headers: {
      Authorization: getAuthHeader()
    }
  });
}
