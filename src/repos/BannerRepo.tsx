import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import { ListBannersQuery } from "../API";
import { listBanners } from "../graphql/queries";
import { Banner } from "../models";

export async function getBanners() {
  try {
    const result = await (API.graphql({ query: listBanners }) as Promise<
      GraphQLResult<ListBannersQuery>
    >);

    return result.data?.listBanners?.items.map((b) => b as Banner) ?? [];
  } catch (e) {
    console.log(e);
    return [];
  }
}
