import { pageSizeLimit } from "../common/app.config";

export async function createShop() {}

export async function updateShop() {}

export async function deleteShop(shopId: string) {}

export async function getShop(slug: string) {
  try {
  } catch (e) {
    throw e;
  }
}

export async function getShops({
  name,
  recommended,
  limit = pageSizeLimit,
  nextToken
}: {
  name?: string;
  recommended?: boolean;
  limit?: number;
  nextToken?: string;
}) {
  try {
  } catch (e) {
    console.log(e);
    return [];
  }

  return [];
}
