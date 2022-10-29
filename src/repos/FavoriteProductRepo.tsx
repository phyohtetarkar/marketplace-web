import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import {
  AddFavoriteProductMutation,
  FindFavoriteProductsByUserQuery,
  RemoveFavoriteProductMutation
} from "../API";
import { pageSizeLimit } from "../common/app.config";
import {
  addFavoriteProduct,
  removeFavoriteProduct
} from "../graphql/cu-favorite-product-mutations";
import { findFavoriteProductsByUser } from "../graphql/cu-favorite-product-queries";
import { FavoriteProduct } from "../models";

export async function addToFavorite({
  userId,
  productId
}: {
  userId: string;
  productId: string;
}) {
  try {
    const details = {
      userID: userId,
      productID: productId
    };

    const result = await (API.graphql({
      query: addFavoriteProduct,
      variables: { input: details }
    }) as Promise<GraphQLResult<AddFavoriteProductMutation>>);
  } catch (e) {
    throw e;
  }
}

export async function removeFromFavorite(id: string) {
  try {
    const result = await (API.graphql({
      query: removeFavoriteProduct,
      variables: { input: { id: id } }
    }) as Promise<GraphQLResult<RemoveFavoriteProductMutation>>);
  } catch (e) {
    throw e;
  }
}

export async function getFavoriteProductsByUser({
  userId,
  nextToken
}: {
  userId: string;
  nextToken?: string;
}) {
  try {
    const variables: any = {
      userID: userId,
      limit: pageSizeLimit
    };

    if (nextToken) {
      variables["nextToken"] = nextToken;
    }

    const result = await (API.graphql({
      query: findFavoriteProductsByUser,
      variables: variables
    }) as Promise<GraphQLResult<FindFavoriteProductsByUserQuery>>);

    return (
      result.data?.favoriteProductsByUser?.items.map(
        (p) => p as FavoriteProduct
      ) ?? []
    );
  } catch (e) {
    throw e;
  }
}
