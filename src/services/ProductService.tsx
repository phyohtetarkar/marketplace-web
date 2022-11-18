import { pageSizeLimit } from "../common/app.config";

export async function getProduct(slug: string) {
  try {
  } catch (e) {
    throw e;
  }
}

export async function getProducts({
  name,
  categoryId,
  shopId,
  newArrival,
  orderBy = "none",
  sortDirection,
  limit = pageSizeLimit,
  nextToken
}: {
  name?: string;
  categoryId?: string;
  shopId?: string;
  newArrival?: boolean;
  orderBy: "price" | "none";
  sortDirection?: "ASC" | "DESC";
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
