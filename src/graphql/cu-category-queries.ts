export const findCategories = /* GraphQL */ `
  query FindCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        slug
        image
        parent
      }
      nextToken
    }
  }
`;