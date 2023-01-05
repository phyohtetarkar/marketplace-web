import { CartItem } from "../common/models";

const basePath = "profile/cart-items";

export async function getCartItemsByUser() {
  const url = process.env.NEXT_PUBLIC_API_URL + basePath;
  return fetch(url).then((res) => res.json() as Promise<[CartItem]>);
}
