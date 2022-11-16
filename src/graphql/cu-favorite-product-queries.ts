export const findFavoriteProductsByUser = `
  query FindFavoriteProductsByUser(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFavoriteProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getFavoriteProductsByUser(
        userID: $userID
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
    ) {
      items {
        id
        userID
        product {
            id
            name
            slug
            price
            images
            category {
              id
              name
              slug
            }
            shop {
              id
              name
              logo
              slug
            }
        }
      }
      nextToken
    }
  }
`