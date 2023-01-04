import { CartItem } from "../common/models";

const basePath = "profile/cart-items";

export async function addToCart({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) {
  try {
  } catch (e) {
    throw e;
  }
}

export async function removeFromCart(id: string) {
  try {
  } catch (e) {
    throw e;
  }
}

export async function getCartItemsByUser({
  userId,
  nextToken,
}: {
  userId: string;
  nextToken?: string;
}) {
  try {
    const url = process.env.REACT_APP_API_URL + basePath;
    return fetch(url).then((res) => res.json() as Promise<[CartItem]>);
  } catch (e) {
    console.log(e);
  }
  return [];
}
