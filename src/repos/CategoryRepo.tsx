import { API } from "aws-amplify";
import { listCategories } from "../graphql/queries";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { FindCategoriesQuery } from "../API";
import { Category } from "../models";

export async function getCategories({ parentId }: { parentId?: string }) {
  try {
    let variables: any = null;

    if (parentId) {
      variables = {
        filter: {
          categoryID: {
            eq: parentId
          }
        }
      };
    }

    const result = await (API.graphql({
      query: listCategories,
      variables: variables
    }) as Promise<GraphQLResult<FindCategoriesQuery>>);

    return result.data?.listCategories?.items.map((c) => c as Category) ?? [];
  } catch (e) {
    console.log(e);
    return [];
  }
}
