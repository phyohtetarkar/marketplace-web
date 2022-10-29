export const findCartItemsByUser = /* GraphQL */ `
  query FindCartItemsByUser(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCartItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    cartItemsByUser(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        quantity
        userID
        product {
          id
          name
          slug
          images
          price
          category {
            id
            name
            slug
          }
          shop {
            id
            name
            slug
          }
        }
      }
      nextToken
    }
  }
`;