import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import {
  AddProductToCartMutation,
  FindCartItemsByUserQuery,
  RemoveProductFromCartMutation
} from "../API";
import {
  addProductToCart,
  removeProductFromCart
} from "../graphql/cu-cartitem-mutations";
import { findCartItemsByUser } from "../graphql/cu-cartitem-queries";
import { CartItem } from "../models";

export async function addToCart({
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
      query: addProductToCart,
      variables: { input: details }
    }) as Promise<GraphQLResult<AddProductToCartMutation>>);
  } catch (e) {
    throw e;
  }
}

export async function removeFromCart(id: string) {
  try {
    const result = await (API.graphql({
      query: removeProductFromCart,
      variables: { input: { id: id } }
    }) as Promise<GraphQLResult<RemoveProductFromCartMutation>>);
  } catch (e) {
    throw e;
  }
}

export async function getCartItemsByUser({
  userId,
  nextToken
}: {
  userId: string;
  nextToken?: string;
}) {
  try {
    const variables: any = {
      userID: userId
    };

    if (nextToken) {
      variables["nextToken"] = nextToken;
    }

    const result = await (API.graphql({
      query: findCartItemsByUser,
      variables: variables
    }) as Promise<GraphQLResult<FindCartItemsByUserQuery>>);

    return result.data?.cartItemsByUser?.items.map((p) => p as CartItem) ?? [];
  } catch (e) {
    throw e;
  }
}
