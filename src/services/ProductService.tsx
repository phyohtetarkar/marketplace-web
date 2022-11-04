import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import {
  FindProductBySlugQuery,
  FindProductsOrderByPriceQuery,
  FindProductsQuery,
  ModelSortDirection
} from "../API";
import { pageSizeLimit } from "../common/app.config";
import {
  findProductBySlug,
  findProducts,
  findProductsOrderByPrice
} from "../graphql/cu-product-queries";
import { Product } from "../models";

export async function getProduct(slug: string) {
  try {
    const result = await (API.graphql({
      query: findProductBySlug,
      variables: { slug: slug }
    }) as Promise<GraphQLResult<FindProductBySlugQuery>>);

    const products = result.data?.getProductBySlug;
    if (!products || products.items.length == 0) {
      throw Error("NOT_FOUND");
    }

    return products.items[0] as Product;
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
    let query = findProducts;
    let variables: any = {};
    let filter: any = {
      suspended: { eq: false },
      deleted: { eq: false }
    };

    switch (orderBy) {
      case "price":
        query = findProductsOrderByPrice;
        variables["type"] = "product";
        variables["sortDirection"] = sortDirection ?? ModelSortDirection.ASC;
        break;
    }

    if (name) {
      filter["name"] = { contains: name };
    }

    if (newArrival) {
      filter["newArrival"] = { eq: true };
    }

    if (categoryId) {
      filter["or"] = {
        mainCategoryId: { eq: categoryId },
        subCategoryId: { eq: categoryId },
        categoryId: { eq: categoryId }
      };
    }

    if (shopId) {
      filter["shopID"] = { eq: shopId };
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

    if (orderBy === "price") {
      const orderedResult =
        result as GraphQLResult<FindProductsOrderByPriceQuery>;

      return (
        orderedResult.data?.productsByPrice?.items.map((p) => p as Product) ??
        []
      );
    }

    const listResult = result as GraphQLResult<FindProductsQuery>;

    return listResult.data?.listProducts?.items.map((p) => p as Product) ?? [];
  } catch (e) {
    console.log(e);
    return [];
  }
}
