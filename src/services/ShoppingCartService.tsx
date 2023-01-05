import exp from "constants";
import { CartItem, CartItemId } from "../common/models";

const basePath = "profile/cart-items";

export async function getCartItemsByUser() {
  const url = process.env.NEXT_PUBLIC_API_URL + basePath;
  return fetch(url, {
    headers: {
      Authorization: "Bearer <token>"
    }
  }).then((res) => res.json() as Promise<[CartItem]>);
}

export async function addToCart(value: CartItem) {
  const url = process.env.NEXT_PUBLIC_API_URL + basePath;
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer <token>"
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
      Authorization: "Bearer <token>"
    }
  });
}

export async function removeFromCart(ids: [CartItemId]) {
  const url = process.env.NEXT_PUBLIC_API_URL + basePath;
  await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(ids),
    headers: {
      Authorization: "Bearer <token>"
    }
  });
}
