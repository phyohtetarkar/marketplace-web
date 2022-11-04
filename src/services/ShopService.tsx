import { API } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { findShopBySlug, findShops } from "../graphql/cu-shop-queries";
import { Shop } from "../models";
import { FindShopBySlugQuery, FindShopsQuery } from "../API";
import { pageSizeLimit } from "../common/app.config";

export async function getShop(slug: string) {
  try {
    const result = await (API.graphql({
      query: findShopBySlug,
      variables: { slug: slug }
    }) as Promise<GraphQLResult<FindShopBySlugQuery>>);

    const shops = result.data?.getShopBySlug;
    if (!shops || shops.items.length === 0) {
      throw Error("NOT_FOUND");
    }

    return shops.items[0] as Shop;
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
    let query = findShops;
    let variables: any = {};
    let filter: any = {
      // suspended: { eq: false }
      // deleted: { eq: false }
    };

    if (name) {
      filter["name"] = { contains: name };
    }

    if (recommended) {
      filter["recommended"] = { eq: true };
    }

    variables["filter"] = filter;
    variables["limit"] = limit;

    if (nextToken) {
      variables["nextToken"] = nextToken;
    }

    const result = await API.graphql({
      query: query,
      variables: variables
    });

    const listResult = result as GraphQLResult<FindShopsQuery>;

    return listResult.data?.listShops?.items.map((p) => p as Shop) ?? [];
  } catch (e) {
    console.log(e);
    return [];
  }
}
