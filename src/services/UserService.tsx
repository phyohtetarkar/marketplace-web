import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import { GetUserByIdQuery } from "../API";
import { getUserById } from "../graphql/cu-user-queries";
import { User } from "../models";

export async function getUser(id: string) {
  try {
    const result = await (API.graphql({
      query: getUserById,
      variables: { id: id }
    }) as Promise<GraphQLResult<GetUserByIdQuery>>);

    const user = result.data?.getUser;
    if (!user) {
      throw Error("not_found");
    }

    if (user.disabled) {
      throw Error("account_disabled");
    }

    return user as User;
  } catch (e) {
    throw e;
  }
}
